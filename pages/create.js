import { useRouter } from "next/router";

import { useAppContext } from "../context/app-context";
import EmptyState from "../components/empty-state/empty-state";
import CreateListInput from "../components/create-list/create-list-input";
import CreateListError from "../components/create-list/create-list-error";
import { addListOptions, useAddList } from "../graphql/mutations";

export default function Create() {
  const { setList } = useAppContext();
  const router = useRouter();
  const { addList, loading, error, reset } = useAddList({
    onCompleted: ({ addList }) => {
      setList(addList);
      router.push("/");
    },
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
        content={
          error ? (
            <CreateListError reset={reset} />
          ) : (
            <CreateListInput
              onSubmit={(name) => {
                addList(addListOptions(name));
              }}
            />
          )
        }
        inProgress={loading}
      />
    </>
  );
}
