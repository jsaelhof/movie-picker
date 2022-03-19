import { useMutation } from "@apollo/client";
import { ADD_LIST } from "../mutations";
import { GET_LISTS } from "../queries";

export const useAddList = (onCompleted) => {
  const [addList, { loading }] = useMutation(ADD_LIST, {
    onCompleted,
    onError: ({ message }) => {
      console.log(message);
    },
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

  return { addList, loading };
};
