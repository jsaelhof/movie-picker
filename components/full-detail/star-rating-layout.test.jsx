import { fireEvent, render, waitFor } from "@testing-library/react";
import { StarRatingLayout } from "./star-rating-layout";

describe("star-rating-layout", () => {
  let test;

  beforeEach(() => {
    test = {
      ratings: {
        id: "tt2463208",
        IMDB: "67%",
        ROTTEN_TOMATOES: "68%",
        METACRITIC: "55%",
      },
    };
  });

  it("should render the five-star rating and ratings breakdown", () => {
    const { getAllByAltText, getByAltText, getByText } = render(
      <StarRatingLayout ratings={test.ratings} />
    );
    expect(getAllByAltText(/star-/)).toHaveLength(5);
    expect(getByAltText("IMDB")).toBeInTheDocument();
    expect(getByText("67%")).toBeInTheDocument();
    expect(getByAltText("ROTTEN_TOMATOES")).toBeInTheDocument();
    expect(getByText("68%")).toBeInTheDocument();
    expect(getByAltText("METACRITIC")).toBeInTheDocument();
    expect(getByText("55%")).toBeInTheDocument();
  });

  it("should toggle the ratings breakdown with mouseEnter and mouseLeave when mobile", async () => {
    const { getByTestId } = render(<StarRatingLayout ratings={test.ratings} />);

    const starRatingLayout = getByTestId("starRatingLayout");
    const ratingsBreakdown = starRatingLayout.lastChild;

    expect(ratingsBreakdown).not.toHaveStyle({
      marginLeft: "0px",
      opacity: "-0.25",
    });

    fireEvent.mouseEnter(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).toHaveStyle({
          marginLeft: "0px",
          opacity: "1",
        }),
      { timeout: 5000 }
    );

    fireEvent.mouseLeave(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).not.toHaveStyle({
          marginLeft: "0px",
          opacity: "-0.25",
        }),
      { timeout: 5000 }
    );
  });

  it("should toggle the ratings breakdown with click when mobile", async () => {
    const { getByTestId } = render(<StarRatingLayout ratings={test.ratings} />);

    const starRatingLayout = getByTestId("starRatingLayout");
    const ratingsBreakdown = starRatingLayout.lastChild;

    expect(ratingsBreakdown).not.toHaveStyle({
      marginLeft: "0px",
      opacity: "-0.25",
    });

    fireEvent.click(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).toHaveStyle({
          marginLeft: "0px",
          opacity: "1",
        }),
      { timeout: 5000 }
    );

    fireEvent.click(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).not.toHaveStyle({
          marginLeft: "0px",
          opacity: "-0.25",
        }),
      { timeout: 5000 }
    );
  });

  it("should toggle the ratings breakdown with mouseEnter and mouseLeave when above mobile", async () => {
    // Mock a 660 pixel width
    window.matchMedia = createMatchMedia(660);

    const { getByTestId } = render(<StarRatingLayout ratings={test.ratings} />);

    const starRatingLayout = getByTestId("starRatingLayout");
    const ratingsBreakdown = starRatingLayout.lastChild;

    expect(ratingsBreakdown).toHaveStyle({
      marginTop: "-16px",
      opacity: "-0.25",
    });

    fireEvent.mouseEnter(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).toHaveStyle({
          marginTop: "16px",
          opacity: "1",
        }),
      { timeout: 5000 }
    );

    fireEvent.mouseLeave(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).toHaveStyle({
          marginTop: "-16px",
          opacity: "-0.25",
        }),
      { timeout: 5000 }
    );
  });

  it("should toggle the ratings breakdown with click when above mobile", async () => {
    // Mock a 660 pixel width
    window.matchMedia = createMatchMedia(660);

    const { getByTestId } = render(<StarRatingLayout ratings={test.ratings} />);

    const starRatingLayout = getByTestId("starRatingLayout");
    const ratingsBreakdown = starRatingLayout.lastChild;

    expect(ratingsBreakdown).toHaveStyle({
      marginTop: "-16px",
      opacity: "-0.25",
    });

    fireEvent.click(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).toHaveStyle({
          marginTop: "16px",
          opacity: "1",
        }),
      { timeout: 5000 }
    );

    fireEvent.click(starRatingLayout);
    await waitFor(
      () =>
        expect(ratingsBreakdown).toHaveStyle({
          marginTop: "-16px",
          opacity: "-0.25",
        }),
      { timeout: 5000 }
    );
  });
});
