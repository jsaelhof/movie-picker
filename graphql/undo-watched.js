import { gql } from "@apollo/client";

export const UNDO_WATCHED = gql`
  mutation UndoWatched($movie: MovieInput!, $db: String!) {
    undoWatched(movie: $movie, db: $db) {
      title
    }
  }
`;
