import { gql, useQuery } from "@apollo/client";

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

export const useSearchByTitle = (title, { skip, onCompleted }) => {
  useQuery(SEARCH_BY_TITLE, {
    skip,
    variables: { title },
    onCompleted: ({ searchByTitle }) => onCompleted(searchByTitle),
  });
};
