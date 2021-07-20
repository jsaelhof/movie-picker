import { gql } from "@apollo/client";

export const EDIT_WATCHED_MOVIE = gql`
  mutation EditWatchedMovie($movie: MovieInput!, $db: String!) {
    editWatched(movie: $movie, db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
    }
  }
`;
