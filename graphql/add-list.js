import { gql } from "@apollo/client";

export const ADD_LIST = gql`
  mutation AddList($userId: String!, $name: String!) {
    addList(userId: $userId, name: $name) {
      id
      label
    }
  }
`;
