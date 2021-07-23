import { gql } from "@apollo/client";

export const MARK_WATCHED = gql`
  mutation MarkWatched($movie: MovieInput!, $list: String!) {
    markWatched(movie: $movie, list: $list) {
      id
      title
      runtime
      source
      genre
      locked
      watchedOn
    }
  }
`;
