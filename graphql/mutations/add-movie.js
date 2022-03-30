import { gql, useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { GET_MOVIES } from "../queries";
import { omitTypename } from "../../utils/omit-typename";

const ADD_MOVIE = gql`
  mutation AddMovie($movie: MovieInput!, $list: String!) {
    addMovie(movie: $movie, list: $list) {
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

export const useAddMovie = ({ onCompleted, onError }) => {
  const [addMovieMutation, status] = useMutation(ADD_MOVIE, {
    onCompleted,
    onError,
    update(cache, { data: { addMovie } }) {
      cache.updateQuery(
        {
          query: GET_MOVIES,
          variables: { list: addMovie.list },
        },
        ({ movies, watchedMovies }) => ({
          movies: [...movies, addMovie],
          watchedMovies,
        })
      );
    },
  });
  return [addMovieMutation, status];
};

export const addMovieOptions = (movie, list) => {
  const id = uuidv4();

  const movieWithId = omitTypename({
    id,
    list: list.id,
    ...movie,
    ratings: {
      ...movie.ratings,
      id,
    },
  });

  return {
    variables: { movie: movieWithId, list: list.id },
    optimisticResponse: {
      addMovie: {
        addedOn: new Date().toISOString(), // This is actually set on the server
        watchedOn: null,
        ...movieWithId,
      },
    },
  };
};
