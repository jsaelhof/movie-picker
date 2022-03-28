import axios from "axios";
import { fromTMDBProvider } from "../../../constants/sources";
import { first, get, isNil } from "lodash";

export const tmdbMovieProvider = async (parent) => {
  // Look up the TMDB data using the movie id from the first request.
  const { data: providerData } = await axios.get(
    `${process.env.TMDB_API_URL}/movie/${parent.imdbID}/watch/providers?api_key=${process.env.TMDB_API_KEY}`
  );

  return first(
    get(providerData, "results.CA.flatrate", [])
      .map(({ provider_name }) => fromTMDBProvider[provider_name])
      .filter((provider_name) => !isNil(provider_name))
  );
};
