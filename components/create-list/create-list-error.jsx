import { Button } from "@mui/material";
import React from "react";
import { Container } from "./create-list-error.styles";

const CreateListError = ({ reset }) => {
  return (
    <Container>
      <div>Sorry, we couldn't create the list.</div>
      <div>
        <Button onClick={reset} variant="outlined" color="primary">
          Try Again
        </Button>
      </div>
    </Container>
  );
};

export default CreateListError;
