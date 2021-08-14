import { gql } from "@apollo/client";

export const GET_DATABASE = gql`
  query GetDatabase {
    database {
      name
    }
  }
`;
