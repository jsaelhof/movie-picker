import { Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { useAppContext } from "../../context/app-context";
import { Container, ListInput } from "./create-list-input.styles";

const CreateListInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const { lists } = useAppContext();

  return (
    <Container>
      <ListInput
        autoFocus
        label="New List Name"
        variant="standard"
        onChange={({ target }) => {
          setError(null);
          setInput(target.value);
        }}
        error={!!error}
      />
      <FormHelperText>{error ?? " "}</FormHelperText>
      <div>
        <Button
          onClick={() => {
            if (input?.length === 0) {
              setError("Please enter a name for your list");
            } else if (lists?.map(({ label }) => label).includes(input)) {
              setError("There is already a list with this name");
            } else {
              setError(null);
              setInput("");
              onSubmit(input);
            }
          }}
          variant="outlined"
          color="primary"
        >
          Create List
        </Button>
      </div>
    </Container>
  );
};

export default CreateListInput;
