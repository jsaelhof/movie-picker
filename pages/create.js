import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useAppContext } from "../context/app-context";
import { useAddList } from "../hooks/use-add-list";
import EmptyListPage from "../components/empty-list-page/empty-list-page";

export default function Create() {
  const { user } = useUser();
  const { setList } = useAppContext();
  const router = useRouter();
  const { addList, loading } = useAddList((addList) => {
    setList(addList);
    router.push("/");
  });

  const onAddList = useCallback(
    (name) =>
      addList({
        variables: { userId: user.sub, name },
      }),
    [addList, user.sub]
  );

  return <EmptyListPage addList={onAddList} creatingList={loading} />;
}
