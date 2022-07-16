import { render } from "@testing-library/react";
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

  it("should", () => {
    const { debug } = render(<StarRatingLayout ratings={test.ratings} />);
    debug();
  });
});
