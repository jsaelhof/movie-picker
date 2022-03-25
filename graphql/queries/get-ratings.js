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
  useQuery(GET_RATINGS, {
    skip,
    variables: { imdbID: movie.imdbID },
    onCompleted: ({ omdbMovie: { ratings } }) => {
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
