import { gql } from "@apollo/client";

export const GET_LISTS = gql`
  query GetLists($userId: String!) {
    lists(userId: $userId) {
      id
      label
    }
  }
`;
