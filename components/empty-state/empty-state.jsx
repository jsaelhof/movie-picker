import { CircularProgress } from "@mui/material";
import { EmptyListLayout, Img, Message, Quote } from "./empty-state.styles";

const EmptyState = ({
  imgSrc,
  quote,
  message,
  content,
  inProgress = false,
}) => (
  <EmptyListLayout>
    <Img src={imgSrc} />
    {quote && <Quote>{quote}</Quote>}
    <Message>{message}</Message>
    <div>{inProgress ? <CircularProgress color="secondary" /> : content}</div>
  </EmptyListLayout>
);

export default EmptyState;
