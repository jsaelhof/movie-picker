import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import NewListDialog from "../new-list-dialog/new-list-dialog";
import { EmptyList, Message, Quote, Yoda } from "./empty-list-page.styles";

const EmptyListPage = ({ addList, creatingList }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EmptyList>
        <Yoda src="images/yoda.png" />
        <Quote>&quot;Impossible to see, the future is&quot;</Quote>
        <Message>
          You&apos;re going to make something great!
          <br />
          But first, you need a list...
        </Message>
        <div>
          {creatingList ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Create A List
            </Button>
          )}
        </div>
      </EmptyList>
      <NewListDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={(newListName) => {
          addList(newListName);
          setOpen(false);
        }}
      />
    </>
  );
};

export default EmptyListPage;
