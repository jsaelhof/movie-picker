import isNil from "lodash/isNil";
import axios from "axios";
import random from "lodash/random";
import { fromTMDBProvider, sources } from "../../constants/sources";
import { ApolloError } from "apollo-server-errors";
import { errorCodes } from "../../constants/error_codes";
import { filter, find, findKey, first, get, pick, reject } from "lodash";
import { convertOmdbRatings } from "../../utils/convert-omdb-ratings";
import { genreLabels } from "../../constants/genres";

const id = () => random(100000000, 999999999).toString();

const TMDB_IMAGE_URL = "http://image.tmdb.org/t/p/%size%%path%";

const toTMDBImageUrl = (path, size = "original") =>
  TMDB_IMAGE_URL.replace("%size%", size).replace("%path%", path);

export const resolvers = {
  Query: {
    database: async (parent, args, { db }) => {
      const name = await db.collection("lists").dbName;
      return { name };
    },
    lists: async (parent, args, { db }) => {
      return await db.collection("lists").find().project({ _id: 0 }).toArray();
    },
    movies: async (parent, { list }, { db }) => {
      return await db
        .collection(list)
        .find({ watchedOn: null })
        .project({ _id: 0 })
        .toArray();
    },
    watchedMovies: async (parent, { list }, { db }) => {
      return await db
        .collection(list)
        .find({ watchedOn: { $ne: null } })
        .project({ _id: 0 })
        .toArray();
    },
    searchByTitle: async (parent, { title }) => {
      const { data } = await axios.get(
        `${process.env.OMDB_API_URL}?s=${title}&type=movie&apikey=${process.env.OMDB_API_KEY}`
      );

      return data.Response === "True"
        ? data.Search.map(({ Title, Year, imdbID, Poster }) => ({
            title: Title,
            year: Year,
            imdbID,
            poster: Poster,
          }))
        : [];
    },
    omdbMovie: async (parent, { imdbID }) => {
      const {
        data: { Response, Title, Year, Runtime, Genre, Ratings, Poster, Plot },
      } = await axios.get(
        `${process.env.OMDB_API_URL}?i=${imdbID}&apikey=${process.env.OMDB_API_KEY}&plot=full`
      );

      if (Response === "True") {
        // Runtime includes " min" like "113 min".
        // ParseInt strips out the text portion.
        const runtime =
          Runtime && Runtime !== "N/A" ? parseInt(Runtime).toString() : null;

        // Genre is a delimited string of genres.
        // Search my list and see if a match is found.
        // If so we'll set that as the genre, otherwise ignore.
        const genre = findKey(genreLabels, (genre) =>
          Genre.split(", ").includes(genre)
        );

        return {
          title: Title,
          year: Year,
          runtime,
          ...(genre && { genre: parseInt(genre) }),
          ratings: Ratings ? convertOmdbRatings(Ratings) : [],
          poster: Poster && Poster !== "N/A" ? Poster : null,
          plot: Plot
        };
      } else {
        return null;
      }
    },
    tmdbMovie: async (parent, { imdbID }) => {
      // Find the data by imdbid. This includes the TMDB id so we can look up the actual data.
      const { data: tmdbData } = await axios.get(
        `${process.env.TMDB_API_URL}/find/${imdbID}?language=en-US&external_source=imdb_id&api_key=${process.env.TMDB_API_KEY}`
      );

      // In general there should be only match but it seems possible to get more than one thing back.
      // If there's zero, then we can't find the TMDB data from the imdb id.
      if (tmdbData.movie_results?.length < 1) {
        throw `No movies found with imdb id ${imdbID}`;
      }

      // Look up the TMDB data using the movie id from the first request.
      const {
        data: { title, backdrop_path, videos, releases, overview },
      } = await axios.get(
        `${process.env.TMDB_API_URL}/movie/${tmdbData.movie_results[0].id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,releases,certifications`
      );

      const officialTrailer = find(
        filter(videos?.results, ["type", "Trailer"]),
        "official"
      );
      const anyTrailer = first(filter(videos?.results, ["type", "Trailer"]));
      const trailerData = first(reject([officialTrailer, anyTrailer], isNil));

      return {
        title,
        backdrop: toTMDBImageUrl(backdrop_path),
        trailer: trailerData ? pick(trailerData, ["site", "key"]) : null,
        certification:
          get(releases, "countries", []).filter(
            ({ certification, iso_3166_1 }) =>
              certification !== "" && iso_3166_1 === "US"
          )?.[0]?.certification || null,
        plot: overview,
      };
    },
    tmdbProvider: async (parent, { imdbID }) => {
      // Find the data by imdbid. This includes the TMDB id so we can look up the actual data.
      const { data: tmdbData } = await axios.get(
        `${process.env.TMDB_API_URL}/find/${imdbID}?language=en-US&external_source=imdb_id&api_key=${process.env.TMDB_API_KEY}`
      );

      // In general there should be only match but it seems possible to get more than one thing back.
      // If there's zero, then we can't find the TMDB data from the imdb id.
      if (tmdbData.movie_results?.length < 1) {
        return { provider: null };
      }

      // Look up the TMDB data using the movie id from the first request.
      const { data: providerData } = await axios.get(
        `${process.env.TMDB_API_URL}/movie/${tmdbData.movie_results[0].id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
      );

      return {
        provider: first(
          get(providerData, "results.CA.flatrate", [])
            .map(({ provider_name }) => fromTMDBProvider[provider_name])
            .filter((provider_name) => !isNil(provider_name))
        ),
      };
    },
  },

  Mutation: {
    addMovie: async (parent, { movie, list }, { db }) => {
      if (!movie.title) throw new ApolloError(errorCodes.NO_TITLE);
      if (isNil(movie.source)) movie.source = sources.NONE;
      if (isNil(movie.locked)) movie.locked = false;

      // TODO: This should be able to be updateOne with upsert and could probably be extracted to a function.
      const { result, ops } = await db.collection(list).insertOne({
        id: id(),
        ...movie,
        addedOn: new Date().toISOString(),
        editedOn: new Date().toISOString(),
      });

      if (result.ok === 1) {
        return ops[0];
      } else {
        throw new Error(`Error adding movie: ${movie.title}`);
      }
    },
    editMovie: async (parent, { movie, list, removeKeys }, { db }) => {
      const { value, ok } = await db.collection(list).findOneAndUpdate(
        {
          id: movie.id,
        },
        {
          $set: {
            ...movie,
            editedOn: new Date().toISOString(),
          },
          ...(removeKeys && {
            $unset: {
              ...removeKeys.reduce((acc, keyToRemove) => {
                acc[keyToRemove] = "";
                return acc;
              }, {}),
            },
          }),
        }
      );

      if (ok === 1) {
        return value;
      } else {
        throw new Error(`Error marking movie watched: ${movie.title}`);
      }
    },
    removeMovie: async (parent, { movieId, list }, { db }) => {
      const { deletedCount } = await db.collection(list).deleteOne({
        id: movieId,
      });

      if (deletedCount === 1) {
        return { id: movieId };
      } else {
        throw new Error(`Error undoing movie watched: ${movie.title}`);
      }
    },
  },
};
