import { useMutation } from "@apollo/client";
import { ADD_LIST } from "../mutations";
import { GET_LISTS } from "../queries";
import { noop } from "lodash";

export const useAddList = (onCompleted) => {
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
