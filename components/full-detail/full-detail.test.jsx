import { renderWithProviders } from "../../utils/render-with-providers";
import FullDetail from "./full-detail";
import { GET_MOVIE_EXTENDED_DETAILS } from "../../graphql/queries/get-movie-extended-details";
import { fireEvent, waitFor } from "@testing-library/react";
import { EDIT_MOVIE } from "../../graphql/mutations";
import { sources } from "../../constants/sources";

jest.mock("uuid", () => {
  v4: () => "111-222-333";
});

const GET_MOVIE_EXTENDED_DETAILS_MOCK = {
  request: {
    query: GET_MOVIE_EXTENDED_DETAILS,
    variables: {
      imdbID: "tt0258463",
    },
  },
  result: {
    data: {
      omdbMovie: {
        imdbID: "tt0258463",
        title: "The Bourne Identity",
        rated: "PG-13",
        actors: ["Franka Potente", "Matt Damon", "Chris Cooper"],
        ratings: {
          id: "tt0258463",
          IMDB: "79%",
          ROTTEN_TOMATOES: "84%",
          METACRITIC: "68%",
        },
      },
      tmdbMovie: {
        imdbID: "tt0258463",
        backdrop: "http://image.tmdb.org/t/1.jpg",
        backdrops: [
          "http://image.tmdb.org/t/1.jpg",
          "http://image.tmdb.org/t/2.jpg",
          "http://image.tmdb.org/t/3.jpg",
          "http://image.tmdb.org/t/4.jpg",
        ],
        trailer: {
          site: "YouTube",
          key: "2tqK_3mKQUw",
        },
        plot: "Wounded to the brink of death",
      },
    },
  },
};

const EDIT_MOVIE_MUTATION_PREV_BG = {
  request: {
    query: EDIT_MOVIE,
    variables: {
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
        background: "http://image.tmdb.org/t/4.jpg",
      },
      list: "saturday",
    },
  },
  newData: jest.fn(() => ({
    data: {
      editMovie: {
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
        background: "http://image.tmdb.org/t/4.jpg",
      },
    },
  })),
};

const EDIT_MOVIE_MUTATION_NEXT_BG = {
  request: {
    query: EDIT_MOVIE,
    variables: {
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
      list: "saturday",
    },
  },
  newData: jest.fn(() => ({
    data: {
      editMovie: {
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
    },
  })),
};

describe("full-detail", () => {
  let test;

  beforeEach(() => {
    test = {
      props: {
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
          background: "http://image.tmdb.org/t/1.jpg",
        },
        showCloseButton: false,
        onClose: jest.fn(),
      },
      list: {
        id: "saturday",
        label: "Saturday Night",
      },
    };
  });

  it("should render the movie details", async () => {
    const { getByText, getByLabelText } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(getByText("The Bourne Identity")).toBeInTheDocument()
    );
    expect(getByText("1h 59m")).toBeInTheDocument();
    expect(getByText("2002")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
    expect(getByText("PG-13")).toBeInTheDocument();
    expect(getByText("Wounded to the brink of death")).toBeInTheDocument();
    expect(getByLabelText("Movie Poster")).toBeInTheDocument();
  });

  it("should search when the movie poster is clicked", async () => {
    window.open = jest.fn();

    const { getByLabelText } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(getByLabelText("Movie Poster")).toBeInTheDocument()
    );
    fireEvent.click(getByLabelText("Movie Poster"));
    expect(window.open).toHaveBeenCalledWith(
      expect.stringMatching(/themoviedb.*Bourne/),
      "moviedb"
    );
  });

  it("should show the close button", async () => {
    const { getByTestId } = await renderWithProviders(
      <FullDetail {...test.props} showCloseButton={true} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    fireEvent.click(getByTestId("CloseThickIcon"));
    expect(test.props.onClose).toHaveBeenCalled();
  });

  it("should show the background saved to the DB if present", async () => {
    const { getByTestId } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(getByTestId("http://image.tmdb.org/t/1.jpg")).toBeInTheDocument()
    );
  });

  it("should show the first backdrop in the list if no background is in the DB", async () => {
    const { getByTestId } = await renderWithProviders(
      <FullDetail
        {...test.props}
        movie={{ ...test.props.movie, background: undefined }}
      />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(getByTestId("http://image.tmdb.org/t/1.jpg")).toBeInTheDocument()
    );
  });

  it("should change to the previous background when the left button is pressed", async () => {
    const { getByTestId } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK, EDIT_MOVIE_MUTATION_PREV_BG]
    );

    await waitFor(() =>
      expect(getByTestId("ChevronLeftIcon")).toBeInTheDocument()
    );
    fireEvent.click(getByTestId("ChevronLeftIcon"));
    await waitFor(() =>
      expect(EDIT_MOVIE_MUTATION_PREV_BG.newData).toHaveBeenCalled()
    );
  });

  it("should change to the next background when the right button is pressed", async () => {
    const { getByTestId } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK, EDIT_MOVIE_MUTATION_NEXT_BG]
    );

    await waitFor(() =>
      expect(getByTestId("ChevronRightIcon")).toBeInTheDocument()
    );
    fireEvent.click(getByTestId("ChevronRightIcon"));
    await waitFor(() =>
      expect(EDIT_MOVIE_MUTATION_NEXT_BG.newData).toHaveBeenCalled()
    );
  });

  it("should launch the trailer", async () => {
    const { getByRole, getByLabelText, queryByLabelText } =
      await renderWithProviders(<FullDetail {...test.props} />, [
        GET_MOVIE_EXTENDED_DETAILS_MOCK,
      ]);

    await waitFor(() =>
      expect(getByRole("button", { name: "Watch Trailer" })).toBeInTheDocument()
    );
    expect(queryByLabelText("Trailer")).not.toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Watch Trailer" }));
    expect(getByLabelText("Trailer")).toBeInTheDocument();
  });

  it("should launch the trailer as an overlay", async () => {
    // Mock a 500 pixel width
    window.matchMedia = createMatchMedia(500);

    const { getByRole, getByLabelText, queryByLabelText } =
      await renderWithProviders(<FullDetail {...test.props} />, [
        GET_MOVIE_EXTENDED_DETAILS_MOCK,
      ]);

    await waitFor(() =>
      expect(getByRole("button", { name: "Watch Trailer" })).toBeInTheDocument()
    );
    expect(queryByLabelText("Trailer")).not.toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Watch Trailer" }));
    const trailerElement = getByLabelText("Trailer");
    expect(document.body).toContainElement(trailerElement);
  });

  it("should show a stream option when the source is streamable and open the stream site", async () => {
    window.open = jest.fn();

    const { getByRole } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(getByRole("button", { name: "Stream Movie" })).toBeInTheDocument()
    );
    fireEvent.click(getByRole("button", { name: "Stream Movie" }));
    expect(window.open).toHaveBeenCalledWith(
      expect.stringMatching(/netflix.*Bourne/),
      "movieView"
    );
  });

  it("should not show a stream option when the source is not streamable", async () => {
    const { queryByRole } = await renderWithProviders(
      <FullDetail
        {...test.props}
        movie={{ ...test.props.movie, source: sources.DVD }}
      />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(
        queryByRole("button", { name: "Stream Movie" })
      ).not.toBeInTheDocument()
    );
  });

  it("should render the footer buttons", async () => {
    const { getByAltText } = await renderWithProviders(
      <FullDetail {...test.props} />,
      [GET_MOVIE_EXTENDED_DETAILS_MOCK]
    );

    await waitFor(() =>
      expect(getByAltText("Search TMDB")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(getByAltText("Search IMDB")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(getByAltText("Search Common Sense Media")).toBeInTheDocument()
    );
  });

  it("should render the skeletons when loading", async () => {
    await renderWithProviders(<FullDetail {...test.props} />, [
      GET_MOVIE_EXTENDED_DETAILS_MOCK,
    ]);

    expect(
      document.getElementsByClassName("MuiSkeleton-root").length
    ).toBeGreaterThan(0);

    // Skeletons should disappear after content is loaded.
    await waitFor(() =>
      expect(document.getElementsByClassName("MuiSkeleton-root").length).toBe(0)
    );
  });
});
