import axios from "axios";
import { convertOmdbRatings } from "../../../utils/convert-omdb-ratings";

export const updateMovie = async (parent, { movieId, list }, { db }) => {
  // Get the movie from my DB
  const movie = await db.collection(list).findOne({ id: movieId });

  let update = null;

  // If it has an imdbID, update it. If not, just pass back the input movie data
  if (movie.imdbId) {
    // fetch the latest ratings
    const {
      data: { Response, Ratings },
    } = await axios.get(
      `${process.env.OMDB_API_URL}?i=${movie.imdbID}&apikey=${process.env.OMDB_API_KEY}&plot=full`
    );

    if (Response === "True") {
      // Build an update for my DB with the latest ratings and an updated editedOn value
      update = {
        ratings: {
          id: movie.id,
          ...(Ratings && convertOmdbRatings(Ratings)),
        },
        editedOn: new Date().toISOString(),
      };
    }
  }

  if (update) {
    // Update my DB and get the updated document
    const { value, ok } = await db.collection(list).findOneAndUpdate(
      {
        id: movie.id,
      },
      {
        $set: update,
      },
      {
        returnDocument: "after",
      }
    );

    if (ok === 1) {
      return value;
    } else {
      throw new Error(`Error updating movie: ${movie.title}`);
    }
  } else {
    // If there was no update generated, just return back the original movie data with no change
    return movie;
  }
};
