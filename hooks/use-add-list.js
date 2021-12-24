import { useMutation } from "@apollo/client";
import { ADD_LIST } from "../graphql";

export const useAddList = (onComplete) => {
  const [addList, { loading }] = useMutation(ADD_LIST, {
    onCompleted: ({ addList }) => {
      onComplete(addList);
    },
    onError: ({ message }) => {
      console.log(message);
    },
    // This updates the lists query in the cache when a new list is added.
    // Code and discussion: https://community.apollographql.com/t/how-exactly-do-you-update-an-array-in-the-cache-after-a-mutation/315
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          lists: (previous, { toReference }) => [
            ...previous,
            toReference(mutationResult.data.addList),
          ],
        },
      });
    },
  });

  return { addList, loading };
};
