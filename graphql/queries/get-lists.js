import { gql } from "@apollo/client";

export const GET_LISTS = gql`
  query GetLists {
    lists {
      id
      label
    }
  }
`;
