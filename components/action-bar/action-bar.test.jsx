import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/render-with-providers";
import ActionBar from "./action-bar";

let mockMedium = false;
jest.mock("../../hooks/use-responsive", () => ({
  useResponsive: () => ({
    medium: mockMedium,
  }),
}));

describe("action-bar", () => {
  let test;

  beforeEach(() => {
    test = {
      onAdd: jest.fn(),
      onPick: jest.fn(),
    };
  });

  it("should not render the bar when disabled", async () => {
    const { queryByText } = await renderWithProviders(
      <ActionBar disabled={true} onAdd={test.onAdd} onPick={test.onPick} />
    );

    expect(queryByText("Added")).not.toBeInTheDocument();
  });

  it("should not render the bar when enabled", async () => {
    const { getByText, getByLabelText } = await renderWithProviders(
      <ActionBar disabled={false} onAdd={test.onAdd} onPick={test.onPick} />
    );

    expect(getByText("Added")).toBeInTheDocument();
    expect(getByLabelText("Add Movie")).toBeInTheDocument();
    expect(getByLabelText("Pick A Movie")).toBeInTheDocument();
  });

  it("should render the Add Movie button with a label when space exists", async () => {
    const { getByText, getByLabelText } = await renderWithProviders(
      <ActionBar disabled={false} onAdd={test.onAdd} onPick={test.onPick} />
    );

    expect(getByLabelText("Add Movie")).toBeInTheDocument();
    expect(getByText("Add Movie")).toBeInTheDocument();
  });

  it("should render the Add Movie button without a label when space is limited", async () => {
    mockMedium = true;

    const { queryByText, getByLabelText } = await renderWithProviders(
      <ActionBar disabled={false} onAdd={test.onAdd} onPick={test.onPick} />
    );

    expect(getByLabelText("Add Movie")).toBeInTheDocument();
    expect(queryByText("Add Movie")).not.toBeInTheDocument();
  });

  it("should call onAdd when Add Movie is pressed", async () => {
    const { getByLabelText } = await renderWithProviders(
      <ActionBar disabled={false} onAdd={test.onAdd} onPick={test.onPick} />
    );

    fireEvent.click(getByLabelText("Add Movie"));
    expect(test.onAdd).toBeCalled();
  });

  it("should call onPick when Pick A Movie is pressed", async () => {
    const { getByRole } = await renderWithProviders(
      <ActionBar disabled={false} onAdd={test.onAdd} onPick={test.onPick} />
    );

    fireEvent.click(getByRole("button", { name: "Pick A Movie" }));
    expect(test.onPick).toBeCalled();
  });
});
