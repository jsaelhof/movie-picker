import { gql } from "@apollo/client";

export const SEARCH_BY_TITLE = gql`
  query SearchByTitle($title: String!) {
    searchByTitle(title: $title) {
      title
      year
      imdbID
      poster
    }
  }
`;
