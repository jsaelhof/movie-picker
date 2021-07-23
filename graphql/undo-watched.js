import { gql } from "@apollo/client";

export const UNDO_WATCHED = gql`
  mutation UndoWatched($movie: MovieInput!, $list: String!) {
    undoWatched(movie: $movie, list: $list) {
      title
    }
  }
`;
