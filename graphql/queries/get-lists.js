import { gql, useQuery } from "@apollo/client";

export const GET_LISTS = gql`
  query GetLists {
    lists {
      id
      label
    }
  }
`;

export const useGetLists = ({ onCompleted }) => {
  const { data, ...rest } = useQuery(GET_LISTS, {
    onCompleted: ({ lists }) => {
      onCompleted(lists[0]);
    },
  });

  return { ...data, ...rest };
};
