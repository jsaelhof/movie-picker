import { Button, CircularProgress } from "@mui/material";
import { EmptyListLayout, Img, Message, Quote } from "./empty-state.styles";

const EmptyState = ({
  imgSrc,
  quote,
  message,
  buttonText,
  inProgress = false,
  onClick,
}) => (
  <EmptyListLayout>
    <Img src={imgSrc} />
    {quote && <Quote>{quote}</Quote>}
    <Message>{message}</Message>
    <div>
      {inProgress ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button variant="outlined" color="primary" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  </EmptyListLayout>
);

export default EmptyState;
