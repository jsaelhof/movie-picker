import { gql } from "@apollo/client";

export const ADD_LIST = gql`
  mutation AddList($name: String!) {
    addList(name: $name) {
      id
      label
    }
  }
`;
