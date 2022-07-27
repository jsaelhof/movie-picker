import { fireEvent, render } from "@testing-library/react";
import { AppContext } from "../../context/app-context";
import { renderWithProviders } from "../../utils/render-with-providers";
import ListGrid from "./list-grid";

jest.mock("./movie.jsx", () => ({ onDeleteMovie, movie }) => (
  <div
    aria-label="movieMock"
    data-runtime={movie.runtime}
    data-addedon={movie.addedOn}
    data-title={movie.title}
    onClick={() => onDeleteMovie(movie)}
  >
    {movie.title}
  </div>
));

describe("", () => {
  let props;

  beforeEach(() => {
    props = {
      movies: [
        {
          id: 0,
          title: "Movie 1",
          addedOn: new Date(100000),
          runtime: 20000,
        },
        {
          id: 1,
          title: "Movie 2",
          addedOn: new Date(10000),
          runtime: 10000,
        },
        {
          id: 2,
          title: "Movie 3",
          addedOn: new Date(500000),
          runtime: 5000,
        },
      ],
      onRemoveMovie: jest.fn(),
    };
  });

  it("should render movies starting with the most recently added", async () => {
    const { queryAllByText } = await renderWithProviders(
      <ListGrid {...props} />
    );
    expect(queryAllByText(/Movie/)[0].getAttribute("data-title")).toBe(
      "Movie 3"
    );
    expect(queryAllByText(/Movie/)[1].getAttribute("data-title")).toBe(
      "Movie 1"
    );
    expect(queryAllByText(/Movie/)[2].getAttribute("data-title")).toBe(
      "Movie 2"
    );
  });

  it("should render movies starting with the least recently added", () => {
    const { queryAllByText } = render(
      <AppContext.Provider value={{ order: ["addedOn", "asc"] }}>
        <ListGrid {...props} />
      </AppContext.Provider>
    );

    expect(queryAllByText(/Movie/)[0].getAttribute("data-title")).toBe(
      "Movie 2"
    );
    expect(queryAllByText(/Movie/)[1].getAttribute("data-title")).toBe(
      "Movie 1"
    );
    expect(queryAllByText(/Movie/)[2].getAttribute("data-title")).toBe(
      "Movie 3"
    );
  });

  it("should render movies starting with the longest runtime", () => {
    const { queryAllByText } = render(
      <AppContext.Provider value={{ order: ["runtime", "desc"] }}>
        <ListGrid {...props} />
      </AppContext.Provider>
    );

    expect(queryAllByText(/Movie/)[0].getAttribute("data-title")).toBe(
      "Movie 1"
    );
    expect(queryAllByText(/Movie/)[1].getAttribute("data-title")).toBe(
      "Movie 2"
    );
    expect(queryAllByText(/Movie/)[2].getAttribute("data-title")).toBe(
      "Movie 3"
    );
  });

  it("should render movies starting with the shortest runtime", () => {
    const { queryAllByText } = render(
      <AppContext.Provider value={{ order: ["runtime", "asc"] }}>
        <ListGrid {...props} />
      </AppContext.Provider>
    );

    expect(queryAllByText(/Movie/)[0].getAttribute("data-title")).toBe(
      "Movie 3"
    );
    expect(queryAllByText(/Movie/)[1].getAttribute("data-title")).toBe(
      "Movie 2"
    );
    expect(queryAllByText(/Movie/)[2].getAttribute("data-title")).toBe(
      "Movie 1"
    );
  });

  it("should render movies alphabetically", () => {
    const { queryAllByText } = render(
      <AppContext.Provider value={{ order: ["title", "asc"] }}>
        <ListGrid {...props} />
      </AppContext.Provider>
    );

    expect(queryAllByText(/Movie/)[0].getAttribute("data-title")).toBe(
      "Movie 1"
    );
    expect(queryAllByText(/Movie/)[1].getAttribute("data-title")).toBe(
      "Movie 2"
    );
    expect(queryAllByText(/Movie/)[2].getAttribute("data-title")).toBe(
      "Movie 3"
    );
  });

  it("should render movies reverse alphabetically", () => {
    const { queryAllByText } = render(
      <AppContext.Provider value={{ order: ["title", "desc"] }}>
        <ListGrid {...props} />
      </AppContext.Provider>
    );

    expect(queryAllByText(/Movie/)[0].getAttribute("data-title")).toBe(
      "Movie 3"
    );
    expect(queryAllByText(/Movie/)[1].getAttribute("data-title")).toBe(
      "Movie 2"
    );
    expect(queryAllByText(/Movie/)[2].getAttribute("data-title")).toBe(
      "Movie 1"
    );
  });

  it("should render the empty list when there are no movies", async () => {
    const { getByRole } = await renderWithProviders(
      <ListGrid {...props} movies={[]} />
    );
    expect(getByRole("button", { name: "Add a Movie" })).toBeInTheDocument();
  });

  it("should render null when movies is undefined", async () => {
    const { queryByRole, queryByText } = await renderWithProviders(
      <ListGrid {...props} movies={undefined} />
    );
    expect(queryByText(/Movie/)).not.toBeInTheDocument();
    expect(
      queryByRole("button", { name: "Add a Movie" })
    ).not.toBeInTheDocument();
  });

  it("should render the delete confirmation and call onRemoveMovie when deleting a movie", async () => {
    const { getByText, getByRole, queryByText } = await renderWithProviders(
      <ListGrid {...props} />
    );

    fireEvent.click(getByText("Movie 1"));
    expect(getByText("'Movie 1' will be removed")).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: "Delete" }));
    expect(props.onRemoveMovie).toHaveBeenCalledWith(props.movies[0]);
    expect(queryByText("'Movie 1' will be removed")).not.toBeInTheDocument();
  });

  it("should render the delete confirmation and cancel correctly when deleting a movie", async () => {
    const { getByText, getByRole, queryByText } = await renderWithProviders(
      <ListGrid {...props} />
    );

    fireEvent.click(getByText("Movie 1"));
    expect(getByText("'Movie 1' will be removed")).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: "Cancel" }));
    expect(props.onRemoveMovie).not.toHaveBeenCalled();
    expect(queryByText("'Movie 1' will be removed")).not.toBeInTheDocument();
  });
});
