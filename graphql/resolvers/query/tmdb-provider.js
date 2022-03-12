import axios from "axios";
import { fromTMDBProvider } from "../../../constants/sources";
import { first, get, isNil } from "lodash";

export const tmdbProvider = async (parent, { imdbID }) => {
  // Find the data by imdbid. This includes the TMDB id so we can look up the actual data.
  const { data: tmdbData } = await axios.get(
    `${process.env.TMDB_API_URL}/find/${imdbID}?language=en-US&external_source=imdb_id&api_key=${process.env.TMDB_API_KEY}`
  );

  // In general there should be only match but it seems possible to get more than one thing back.
  // If there's zero, then we can't find the TMDB data from the imdb id.
  if (tmdbData.movie_results?.length < 1) {
    return { imdbID, provider: null };
  }

  // Look up the TMDB data using the movie id from the first request.
  const { data: providerData } = await axios.get(
    `${process.env.TMDB_API_URL}/movie/${tmdbData.movie_results[0].id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
  );

  return {
    imdbID,
    provider: first(
      get(providerData, "results.CA.flatrate", [])
        .map(({ provider_name }) => fromTMDBProvider[provider_name])
        .filter((provider_name) => !isNil(provider_name))
    ),
  };
};
