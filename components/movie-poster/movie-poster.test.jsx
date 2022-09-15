import { fireEvent, render } from "@testing-library/react";
import MoviePoster from "./movie-poster";

describe("movie-poster", () => {
  let props;
  let noPosterProps;

  beforeEach(() => {
    props = {
      movie: {
        id: "8502fd8b-165e-4239-965f-b46f8d523829",
        title: "The Bourne Identity",
        list: "saturday",
        runtime: 7140,
        source: 1,
        genre: 3,
        year: "2002",
        poster: "https://m.media-amazon.com/images/M/SX300.jpg",
        imdbID: "tt0258463",
        locked: false,
        addedOn: "2022-03-15T04:28:22.166Z",
        watchedOn: null,
        ratings: {
          id: "8502fd8b-165e-4239-965f-b46f8d523829",
          IMDB: "79%",
          ROTTEN_TOMATOES: "84%",
          METACRITIC: "68%",
        },
        background: "http://image.tmdb.org/t/2.jpg",
      },
      onClick: jest.fn(),
    };

    noPosterProps = { ...props, movie: { ...props.movie, poster: null } };
  });

  it("should render the correct height and width ratio", () => {
    const { getByLabelText } = render(<MoviePoster {...props} height={1000} />);
    expect(getByLabelText("Movie Poster")).toHaveStyle({
      width: "640px",
      height: "1000px",
    });
  });

  it("should render the poster when a url exists in the movie", () => {
    const { getByLabelText, queryByText } = render(<MoviePoster {...props} />);
    expect(getByLabelText("Movie Poster")).toHaveStyle({
      "background-image": `url(${props.movie.poster})`,
    });
    expect(queryByText(/Bourne/)).not.toBeInTheDocument();
  });

  it("should render the 'no poster' view when a url does not exist in the movie", () => {
    const { getByText } = render(<MoviePoster {...noPosterProps} />);
    expect(getByText(/Bourne/)).toBeInTheDocument();
  });

  it("should be active when an onClick handler is provided", () => {
    const { getByLabelText } = render(<MoviePoster {...props} />);

    expect(getByLabelText("Movie Poster")).toHaveStyle({
      cursor: "pointer",
    });
  });

  it("should not be active when an onClick handler is omitted", () => {
    const { getByLabelText } = render(
      <MoviePoster {...props} onClick={undefined} />
    );

    expect(getByLabelText("Movie Poster")).not.toHaveStyle({
      cursor: "pointer",
    });
  });

  it("should invoke the handler onClick when there is a poster", () => {
    const { getByLabelText } = render(<MoviePoster {...props} />);
    fireEvent.click(getByLabelText("Movie Poster"));
    expect(props.onClick).toHaveBeenCalled();
  });

  it("should invoke the handler onClick when there is not a poster", () => {
    const { getByLabelText } = render(<MoviePoster {...noPosterProps} />);
    fireEvent.click(getByLabelText("Movie Poster"));
    expect(props.onClick).toHaveBeenCalled();
  });

  it("should not invoke the handler onClick when there is a poster and no onClick", () => {
    const { getByLabelText } = render(
      <MoviePoster {...props} onClick={undefined} />
    );
    fireEvent.click(getByLabelText("Movie Poster"));
    expect(props.onClick).not.toHaveBeenCalled();
  });

  it("should invoke the handler onClick when there is not a poster and no onClick", () => {
    const { getByLabelText } = render(
      <MoviePoster {...noPosterProps} onClick={undefined} />
    );
    fireEvent.click(getByLabelText("Movie Poster"));
    expect(props.onClick).not.toHaveBeenCalled();
  });

  it("should dim the poster when locked", () => {
    const { getByLabelText } = render(
      <MoviePoster {...props} movie={{ ...props.movie, locked: true }} />
    );

    expect(getByLabelText("Movie Poster")).toHaveStyle({
      opacity: "0.3",
    });
  });

  it("should not dim the poster when locked but noLock is passed", () => {
    const { getByLabelText } = render(
      <MoviePoster {...props} movie={{ ...props.movie, locked: true }} noLock />
    );

    expect(getByLabelText("Movie Poster")).toHaveStyle({
      opacity: "1",
    });
  });

  it("should be relatively positioned when noRel is false", () => {
    const { getByLabelText } = render(<MoviePoster {...props} />);

    expect(getByLabelText("Movie Poster").parentNode).toHaveStyle({
      position: "relative",
    });
  });

  it("should not be relatively positioned when noRel is true", () => {
    const { getByLabelText } = render(<MoviePoster {...props} noRel />);

    expect(getByLabelText("Movie Poster").parentNode).not.toHaveStyle({
      position: "relative",
    });
  });
});
