import axios from "axios";
import { findKey } from "lodash";
import { convertOmdbRatings } from "../../../utils/convert-omdb-ratings";
import { genreLabels } from "../../../constants/genres";

export const omdbMovie = async (parent, { imdbID }) => {
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
      imdbID,
      title: Title,
      year: Year,
      runtime,
      ...(genre && { genre: parseInt(genre) }),
      ratings: Ratings ? convertOmdbRatings(Ratings) : [],
      poster: Poster && Poster !== "N/A" ? Poster : null,
      plot: Plot,
    };
  } else {
    return null;
  }
};
