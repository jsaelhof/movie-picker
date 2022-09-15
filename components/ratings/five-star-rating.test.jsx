import { render } from "@testing-library/react";
import FiveStarRating from "./five-star-rating";

describe("five-star-rating", () => {
  it("should render the correct stars for the given ratings", () => {
    const { getAllByAltText } = render(
      <FiveStarRating
        ratings={{
          id: "tt0120737",
          IMDB: "38%",
          ROTTEN_TOMATOES: "91%",
          METACRITIC: "92%",
        }}
      />
    );
    expect(getAllByAltText("star-full")).toHaveLength(3);
    expect(getAllByAltText("star-half")).toHaveLength(1);
    expect(getAllByAltText("star-outline")).toHaveLength(1);
  });

  it("should render zero stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "0%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(0);
    expect(queryAllByAltText("star-half")).toHaveLength(0);
    expect(queryAllByAltText("star-outline")).toHaveLength(5);
  });

  it("should render a half star", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "10%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(0);
    expect(queryAllByAltText("star-half")).toHaveLength(1);
    expect(queryAllByAltText("star-outline")).toHaveLength(4);
  });

  it("should render one star", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "20%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(1);
    expect(queryAllByAltText("star-half")).toHaveLength(0);
    expect(queryAllByAltText("star-outline")).toHaveLength(4);
  });

  it("should render one and a half stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "30%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(1);
    expect(queryAllByAltText("star-half")).toHaveLength(1);
    expect(queryAllByAltText("star-outline")).toHaveLength(3);
  });

  it("should render two stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "40%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(2);
    expect(queryAllByAltText("star-half")).toHaveLength(0);
    expect(queryAllByAltText("star-outline")).toHaveLength(3);
  });

  it("should render two and a half stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "50%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(2);
    expect(queryAllByAltText("star-half")).toHaveLength(1);
    expect(queryAllByAltText("star-outline")).toHaveLength(2);
  });

  it("should render three stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "60%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(3);
    expect(queryAllByAltText("star-half")).toHaveLength(0);
    expect(queryAllByAltText("star-outline")).toHaveLength(2);
  });

  it("should render three and a half stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "70%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(3);
    expect(queryAllByAltText("star-half")).toHaveLength(1);
    expect(queryAllByAltText("star-outline")).toHaveLength(1);
  });

  it("should render four stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "80%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(4);
    expect(queryAllByAltText("star-half")).toHaveLength(0);
    expect(queryAllByAltText("star-outline")).toHaveLength(1);
  });

  it("should render four and a half stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "90%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(4);
    expect(queryAllByAltText("star-half")).toHaveLength(1);
    expect(queryAllByAltText("star-outline")).toHaveLength(0);
  });

  it("should render five stars", () => {
    const { queryAllByAltText } = render(
      <FiveStarRating
        ratings={{
          IMDB: "100%",
        }}
      />
    );
    expect(queryAllByAltText("star-full")).toHaveLength(5);
    expect(queryAllByAltText("star-half")).toHaveLength(0);
    expect(queryAllByAltText("star-outline")).toHaveLength(0);
  });
});
