import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/render-with-providers";
import Movie from "./movie";

jest.mock("uuid", () => {
  v4: () => "111-222-333";
});

// Mock the expanded view since it has it's own tests and inner working.
// In this mock we just want assign the props that would be passed to it
// and test that they are passed correctly when various interactions occur.
jest.mock("./expanded", () => ({ preload, open, onClose }) => (
  <div data-preload={preload} data-open={open} onClick={() => onClose()}>
    Expanded
  </div>
));

describe("movie", () => {
  let props;

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
      onEditMovie: jest.fn(),
      onMarkWatched: jest.fn(),
      onDeleteMovie: jest.fn(),
    };
  });

  it("should render a movie list entry", async () => {
    const {
      getByTestId,
      getByLabelText,
      getAllByLabelText,
      getByAltText,
      getAllByAltText,
      getByText,
    } = await renderWithProviders(<Movie {...props} />);

    // Should be two posters, the second is the larger overlaid one that is wrapped in an invisible div
    expect(getAllByLabelText("Movie Poster")).toHaveLength(2);

    // The larger poster is invisible by default
    expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 });

    // Movie info
    expect(getAllByAltText(/star-/)).toHaveLength(5);
    expect(getByText("1h 59m")).toBeInTheDocument();
    expect(getByLabelText("Edit")).toBeInTheDocument();
    expect(getByLabelText("Mark as Watched")).toBeInTheDocument();
    expect(getByLabelText("Lock")).toBeInTheDocument();
    expect(getByLabelText("Delete")).toBeInTheDocument();
    expect(getByAltText("IMDB")).toBeInTheDocument();
    expect(getByText("79%")).toBeInTheDocument();
    expect(getByAltText("ROTTEN_TOMATOES")).toBeInTheDocument();
    expect(getByText("84%")).toBeInTheDocument();
    expect(getByAltText("METACRITIC")).toBeInTheDocument();
    expect(getByText("68%")).toBeInTheDocument();
    expect(getByLabelText("Netflix")).toBeInTheDocument();

    // The expanded detail should be closed by default
    expect(getByText("Expanded")).toHaveAttribute("data-open", "false");
  });

  it("should render a movie list entry as locked", async () => {
    const { getByLabelText } = await renderWithProviders(
      <Movie {...props} movie={{ ...props.movie, locked: true }} />
    );

    expect(getByLabelText("Unlock")).toBeInTheDocument();
  });

  it("should open the zoomed poster and preload the expanded detail on rollover and close the zoomed poster on rollout", async () => {
    const { getByTestId, getByText } = await renderWithProviders(
      <Movie {...props} />
    );

    fireEvent.mouseOver(getByTestId("listItem"));
    await waitFor(() => {
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 1 });
      expect(getByText("Expanded")).toHaveAttribute("data-preload", "true");
    });

    fireEvent.mouseOut(getByTestId("listItem"));
    await waitFor(() => {
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 });
      expect(getByText("Expanded")).toHaveAttribute("data-preload", "false");
    });
  });

  it("should close the zoomed poster and open the expanded detail view when clicked", async () => {
    const { getByTestId, getByText } = await renderWithProviders(
      <Movie {...props} />
    );

    fireEvent.mouseOver(getByTestId("listItem"));
    await waitFor(() =>
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 1 })
    );

    fireEvent.click(getByTestId("positioner"));
    await waitFor(() => {
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 });
      expect(getByText("Expanded")).toHaveAttribute("data-open", "true");
    });
  });

  it("should toggle the actions and ratings when mousing over the five star rating", async () => {
    const { getByTestId } = await renderWithProviders(<Movie {...props} />);

    expect(getByTestId("actions")).toHaveStyle({
      transform: "translateX(0px)",
    });
    expect(getByTestId("ratings")).not.toHaveStyle({
      transform: "translateX(0px)",
    });

    fireEvent.mouseOver(getByTestId("rating"));

    await waitFor(() => {
      expect(getByTestId("actions")).not.toHaveStyle({
        transform: "translateX(0px)",
      });
      expect(getByTestId("ratings")).toHaveStyle({
        transform: "translateX(0px)",
      });
    });

    fireEvent.mouseOut(getByTestId("rating"));

    await waitFor(() => {
      expect(getByTestId("actions")).toHaveStyle({
        transform: "translateX(0px)",
      });
      expect(getByTestId("ratings")).not.toHaveStyle({
        transform: "translateX(0px)",
      });
    });
  });

  it("should toggle the actions and ratings when clicking the five star rating", async () => {
    const { getByTestId } = await renderWithProviders(<Movie {...props} />);

    expect(getByTestId("actions")).toHaveStyle({
      transform: "translateX(0px)",
    });
    expect(getByTestId("ratings")).not.toHaveStyle({
      transform: "translateX(0px)",
    });

    fireEvent.click(getByTestId("rating"));

    await waitFor(() => {
      expect(getByTestId("actions")).not.toHaveStyle({
        transform: "translateX(0px)",
      });
      expect(getByTestId("ratings")).toHaveStyle({
        transform: "translateX(0px)",
      });
    });

    fireEvent.click(getByTestId("rating"));

    await waitFor(() => {
      expect(getByTestId("actions")).toHaveStyle({
        transform: "translateX(0px)",
      });
      expect(getByTestId("ratings")).not.toHaveStyle({
        transform: "translateX(0px)",
      });
    });
  });

  it("should send the edit action and close the zoomed view", async () => {
    const { getByLabelText, getByTestId } = await renderWithProviders(
      <Movie {...props} />
    );
    fireEvent.click(getByLabelText("Edit"));
    expect(props.onEditMovie).toHaveBeenCalledWith(props.movie);
    await waitFor(() =>
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 })
    );
  });

  it("should send the mark watched action and close the zoomed view", async () => {
    const { getByLabelText, getByTestId } = await renderWithProviders(
      <Movie {...props} />
    );
    fireEvent.click(getByLabelText("Mark as Watched"));
    expect(props.onMarkWatched).toHaveBeenCalledWith(props.movie);
    await waitFor(() =>
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 })
    );
  });

  it("should send the delete action and close the zoomed view", async () => {
    const { getByLabelText, getByTestId } = await renderWithProviders(
      <Movie {...props} />
    );
    fireEvent.click(getByLabelText("Delete"));
    expect(props.onDeleteMovie).toHaveBeenCalledWith(props.movie);
    await waitFor(() =>
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 })
    );
  });

  it("should send the edit action with locked:true and close the zoomed view", async () => {
    const { getByLabelText, getByTestId } = await renderWithProviders(
      <Movie {...props} />
    );
    fireEvent.click(getByLabelText("Lock"));
    expect(props.onEditMovie).toHaveBeenCalledWith(
      {
        ...props.movie,
        locked: true,
      },
      false
    );
    await waitFor(() =>
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 })
    );
  });

  it("should send the edit action with locked:false and close the zoomed view", async () => {
    const { getByLabelText, getByTestId } = await renderWithProviders(
      <Movie {...props} movie={{ ...props.movie, locked: true }} />
    );
    fireEvent.click(getByLabelText("Unlock"));
    expect(props.onEditMovie).toHaveBeenCalledWith(
      {
        ...props.movie,
        locked: false,
      },
      false
    );
    await waitFor(() =>
      expect(getByTestId("positioner")).toHaveStyle({ opacity: 0 })
    );
  });
});
