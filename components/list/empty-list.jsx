import { Button } from "@mui/material";
import EmptyState from "../empty-state/empty-state";

const EmptyList = ({ onAddMovie }) => (
  <EmptyState
    imgSrc="images/stormtroopers.png"
    quote="&quot;These aren't the droids we're looking for.&quot;"
    message={
      <>
        There are no movies on this list yet.
        <br />
        Let&apos;s add one now!
      </>
    }
    content={
      <Button onClick={onAddMovie} variant="outlined" color="primary">
        Add a Movie
      </Button>
    }
  />
);

export default EmptyList;
