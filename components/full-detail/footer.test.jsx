import { fireEvent, render } from "@testing-library/react";
import Footer from "./footer";

describe("full detail footer", () => {
  let test;

  const { open } = window;

  beforeEach(() => {
    test = {
      movie: {
        id: 123,
        title: "TheNameOfAFilm",
      },
    };

    // Delete the existing
    delete window.open;
    // Replace with the custom value
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = open;
  });

  it("should render the footer action images", () => {
    const { getByAltText } = render(<Footer movie={test.movie} />);
    expect(getByAltText("Search IMDB")).toBeInTheDocument();
    expect(getByAltText("Search TMDB")).toBeInTheDocument();
    expect(getByAltText("Search Common Sense Media")).toBeInTheDocument();
  });

  it("should open IMDB with title when clicked when no imdbID is provided", () => {
    const { getByAltText } = render(<Footer movie={test.movie} />);
    fireEvent.click(getByAltText("Search IMDB"));
    expect(window.open).toHaveBeenCalledWith(
      // Without replicating the entire URL, this should ensure the URL has the right domain and the movie title
      expect.stringMatching(new RegExp(`www\.imdb\.com.*${test.movie.title}`)),
      "movieInfo"
    );
  });

  it("should open IMDB with imdbID and ignore title when both are provided", () => {
    const { getByAltText } = render(
      <Footer movie={{ ...test.movie, imdbID: "t12345" }} />
    );
    fireEvent.click(getByAltText("Search IMDB"));
    expect(window.open).toHaveBeenCalledWith(
      // Without replicating the entire URL, this should ensure the URL has the right domain and the movie title
      expect.stringMatching(new RegExp(`www\.imdb\.com.*t12345`)),
      "movieInfo"
    );
  });

  it("should open TMDB when clicked", () => {
    const { getByAltText } = render(<Footer movie={test.movie} />);
    fireEvent.click(getByAltText("Search TMDB"));
    expect(window.open).toHaveBeenCalledWith(
      // Without replicating the entire URL, this should ensure the URL has the right domain and the movie title
      expect.stringMatching(
        new RegExp(`www\.themoviedb\.org.*${test.movie.title}`)
      ),
      "movieInfo"
    );
  });

  it("should open Common Sense Media when clicked", () => {
    const { getByAltText } = render(<Footer movie={test.movie} />);
    fireEvent.click(getByAltText("Search Common Sense Media"));
    expect(window.open).toHaveBeenCalledWith(
      // Without replicating the entire URL, this should ensure the URL has the right domain and the movie title
      expect.stringMatching(
        new RegExp(`www\.commonsensemedia\.org.*${test.movie.title}`)
      ),
      "movieInfo"
    );
  });
});
