import { gql, useMutation } from "@apollo/client";
import { getYear } from "date-fns";
import { useEffect, useState } from "react";

const UPDATE_MOVIE = gql`
  mutation UpdateMovie($movieId: ID!, $list: String!) {
    updateMovie(movieId: $movieId, list: $list) {
      id
      title
      list
      runtime
      source
      genre
      year
      poster
      imdbID
      locked
      addedOn
      watchedOn
      ratings {
        id
        IMDB
        ROTTEN_TOMATOES
        METACRITIC
      }
    }
  }
`;

export const useUpdateMovie = (movie, focused) => {
  const [updateMovie, status] = useMutation(UPDATE_MOVIE);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    // A movie must have an imdbID to pull ratings.
    // I only really care about updating ratings on newer movies as they actually change on platforms like
    // rotten tomatoes and metacritic as more reviews come in.
    // Ideally i'd only check on movies that are less than 6 months old but with only whole years, the best i can do
    // is this year or last year (in case it is early in the current year).
    if (
      !hasUpdated &&
      focused &&
      movie.imdbID &&
      movie.year &&
      getYear(new Date()) - parseInt(movie.year) <= 1
    ) {
      updateMovie({
        variables: {
          movieId: movie.id,
          list: movie.list,
        },
        optimisticResponse: {
          updateMovie: {
            ...movie,
            __typename: "Movie",
          },
        },
      });
      setHasUpdated(true);
    }
  }, [focused, hasUpdated, movie, updateMovie]);

  return status;
};
