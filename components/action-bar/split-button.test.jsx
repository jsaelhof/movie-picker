import { fireEvent, render, waitFor } from "@testing-library/react";
import SplitButton from "./split-button";

let mockMedium = false;
jest.mock("../../hooks/use-responsive", () => ({
  useResponsive: () => ({
    medium: mockMedium,
  }),
}));

describe("split-button", () => {
  let test;

  beforeEach(() => {
    test = {
      onPick: jest.fn(),
    };
  });

  it("should render the split button", () => {
    const { getByRole, getByLabelText } = render(
      <SplitButton onPick={test.onPick} />
    );
    expect(getByRole("button", { name: "Pick A Movie" })).toBeInTheDocument();
    expect(getByLabelText("Pick Menu")).toBeInTheDocument();
  });

  it("should call onPick when the main button is pressed", () => {
    const { getByRole } = render(<SplitButton onPick={test.onPick} />);
    fireEvent.click(getByRole("button", { name: "Pick A Movie" }));
    expect(test.onPick).toHaveBeenCalled();
  });

  it("should open and close the menu when the menu button is pressed", async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SplitButton onPick={test.onPick} />
    );
    fireEvent.click(getByLabelText("Pick Menu"));
    await waitFor(() => {
      expect(getByText(/short/i)).toBeInTheDocument();
    });

    // Couldn't figure out a better way to make this work.
    // Even using waitFor, firing click twice without a sleep ends up firing it twice at once and ends up acting like a single click.
    await new Promise((r) => setTimeout(r, 1));

    fireEvent.click(getByLabelText("Pick Menu"));
    await waitFor(() => {
      expect(queryByText(/short/i)).not.toBeInTheDocument();
    });
  });

  it("should close the menu when clicking outside", async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <SplitButton onPick={test.onPick} />
    );

    fireEvent.click(getByLabelText("Pick Menu"));
    await waitFor(() => {
      expect(getByText(/short/i)).toBeInTheDocument();
    });

    // Couldn't figure out a better way to make this work.
    // Even using waitFor, firing click twice without a sleep ends up firing it twice at once and ends up acting like a single click.
    await new Promise((r) => setTimeout(r, 1));

    fireEvent.click(document);
    await waitFor(() => {
      expect(queryByText(/short/i)).not.toBeInTheDocument();
    });
  });

  it("should call onPick with correct options when a short movie is requested", () => {
    const { getByLabelText, getByText } = render(
      <SplitButton onPick={test.onPick} />
    );
    const menuButton = getByLabelText("Pick Menu");
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);

    const shortButton = getByText(/short/i);
    expect(shortButton).toBeInTheDocument();
    fireEvent.click(shortButton);
    expect(test.onPick).toBeCalledWith({ maxRuntime: 6000 });
  });

  it("should call onPick with correct options when a regular movie is requested", () => {
    const { getByLabelText, getByText } = render(
      <SplitButton onPick={test.onPick} />
    );
    const menuButton = getByLabelText("Pick Menu");
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);

    const regularButton = getByText(/regular/i);
    expect(regularButton).toBeInTheDocument();
    fireEvent.click(regularButton);
    expect(test.onPick).toBeCalledWith({ minRuntime: 6001, maxRuntime: 7800 });
  });

  it("should call onPick with correct options when a long movie is requested", () => {
    const { getByLabelText, getByText } = render(
      <SplitButton onPick={test.onPick} />
    );
    const menuButton = getByLabelText("Pick Menu");
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);

    const longButton = getByText(/long/i);
    expect(longButton).toBeInTheDocument();
    fireEvent.click(longButton);
    expect(test.onPick).toBeCalledWith({ minRuntime: 7801 });
  });
});
