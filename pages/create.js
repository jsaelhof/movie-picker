import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import EmptyListPage from "../components/empty-list-page/empty-list-page";
import { useAppContext } from "../context/app-context";
import { ADD_LIST } from "../graphql";

export default function Create() {
  const { user } = useUser();
  const { setList } = useAppContext();

  const [addList] = useMutation(ADD_LIST, {
    onCompleted: ({ addList }) => {
      setList(addList);
    },
    onError: ({ message }) => {
      console.log(message);
    },
  });

  return (
    <EmptyListPage
      addList={(name) =>
        addList({
          variables: { userId: user.sub, name },
        })
      }
    />
  );
}
