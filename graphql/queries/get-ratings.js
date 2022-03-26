import { gql, useQuery } from "@apollo/client";
import { isEqual, pick } from "lodash";
import { ratingsSources } from "../../constants/ratings";

export const GET_RATINGS = gql`
  query GetRatings($imdbID: ID!) {
    omdbMovie(imdbID: $imdbID) {
      imdbID
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
  }
`;

export const useUpdateRatings = (movie, { skip, onUpdated }) => {
  return useQuery(GET_RATINGS, {
    skip,
    variables: { imdbID: movie.imdbID },
    onCompleted: ({ omdbMovie: { ratings } }) => {
      // If the new ratings differ from the ones in my DB, update the DB.
      // TODO: Should I even store ratings anymore? If i'm going to pull them from the api each time
      // then i should just use those and remove them from my DB.
      if (
        !isEqual(
          pick(ratings, ratingsSources),
          pick(movie.ratings, ratingsSources)
        )
      ) {
        onUpdated({
          ...movie,
          ratings: {
            ...movie.ratings,
            ...ratings,
          },
        });
      }
    },
  });
};
