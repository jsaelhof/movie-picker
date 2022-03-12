import axios from "axios";
import { filter, find, first, get, isNil, pick, reject } from "lodash";

const TMDB_IMAGE_URL = "http://image.tmdb.org/t/p/%size%%path%";

const toTMDBImageUrl = (path, size = "original") =>
  TMDB_IMAGE_URL.replace("%size%", size).replace("%path%", path);

export const tmdbMovie = async (parent, { imdbID }) => {
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
    imdbID,
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
};
