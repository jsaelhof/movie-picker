import { gql } from "@apollo/client";

export const EDIT_WATCHED_MOVIE = gql`
  mutation EditWatchedMovie($movie: MovieInput!, $list: String!) {
    editWatched(movie: $movie, list: $list) {
      id
      title
      runtime
      source
      genre
      locked
    }
  }
`;
