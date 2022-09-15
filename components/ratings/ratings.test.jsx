import { render } from "@testing-library/react";
import { ratingsSource } from "../../constants/ratings";
import Ratings from "./ratings";

describe("ratings", () => {
  it("should render the ratings correctly", () => {
    const { getByText, getByAltText } = render(
      <Ratings
        ratings={{
          id: "tt0120737",
          [ratingsSource.IMDB]: "88%",
          [ratingsSource.ROTTEN_TOMATOES]: "91%",
          [ratingsSource.METACRITIC]: "92%",
        }}
      />
    );
    expect(getByAltText(ratingsSource.IMDB)).toBeInTheDocument();
    expect(getByText("88%")).toBeInTheDocument();
    expect(getByAltText(ratingsSource.ROTTEN_TOMATOES)).toBeInTheDocument();
    expect(getByText("91%")).toBeInTheDocument();
    expect(getByAltText(ratingsSource.METACRITIC)).toBeInTheDocument();
    expect(getByText("92%")).toBeInTheDocument();
  });

  it("should render null when no ratings are provided", () => {
    const { queryByAltText } = render(<Ratings />);
    expect(queryByAltText(ratingsSource.IMDB)).not.toBeInTheDocument();
    expect(
      queryByAltText(ratingsSource.ROTTEN_TOMATOES)
    ).not.toBeInTheDocument();
    expect(queryByAltText(ratingsSource.METACRITIC)).not.toBeInTheDocument();
  });
});
