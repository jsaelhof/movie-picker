import { gql } from "@apollo/client";

export const MARK_WATCHED = gql`
  mutation MarkWatched($movie: MovieInput!, $db: String!) {
    markWatched(movie: $movie, db: $db) {
      _id
      title
      runtime
      source
      genre
      locked
      watched
    }
  }
`;
