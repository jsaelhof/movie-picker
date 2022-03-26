import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_LISTS } from "../queries";
import { noop } from "lodash";

const ADD_LIST = gql`
  mutation AddList($name: String!) {
    addList(name: $name) {
      id
      label
    }
  }
`;

export const addListOptions = (name) => ({
  variables: { name },
});

export const useAddList = ({ onCompleted }) => {
  const [addList, { loading, error, reset }] = useMutation(ADD_LIST, {
    onCompleted,
    onError: noop, // Required to prevent throwing an uncaught exception.
    update(cache, { data: { addList } }) {
      cache.updateQuery(
        {
          query: GET_LISTS,
          variables: { name: addList.label },
        },
        ({ lists }) => ({
          lists: [...lists, addList],
        })
      );
    },
  });

  return { addList, loading, error, reset };
};
