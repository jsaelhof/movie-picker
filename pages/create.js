import { useState } from "react";
import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import { useAddList } from "../graphql/hooks";
import EmptyState from "../components/empty-state/empty-state";
import NewListDialog from "../components/new-list-dialog/new-list-dialog";

export default function Create() {
  const [open, setOpen] = useState();
  const { setList } = useAppContext();
  const router = useRouter();
  const { addList, loading } = useAddList(({ addList }) => {
    setList(addList);
    router.push("/");
  });

  return (
    <>
      <EmptyState
        imgSrc={"images/delorean.png"}
        quote="&quot;Roads? Where we're going, we don't need roads.&quot;"
        message={
          <>
            The future looks bright.
            <br />
            Let&apos;s get started by making a list.
          </>
        }
        buttonText="Create a List"
        onClick={() => setOpen(true)}
        inProgress={loading}
      />

      <NewListDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={(name) => {
          addList({
            variables: { name },
          }),
            setOpen(false);
        }}
      />
    </>
  );
}
