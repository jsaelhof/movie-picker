import EmptyState from "../empty-state/empty-state";

const EmptyList = () => (
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
    buttonText="Add a Movie"
    onClick={() => {
      console.log("TEST");
    }}
  />
);

export default EmptyList;
