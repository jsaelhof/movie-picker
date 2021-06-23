import { gql } from "@apollo/client";

export const GET_DBS = gql`
  query GetDBs {
    dbs {
      id
      label
    }
  }
`;
