import DbSelect from "./db-select";
import { renderWithProviders } from "../../utils/render-with-providers";
import { fireEvent, waitFor } from "@testing-library/react";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("db-select", () => {
  it("should render the list with the active list when closed", async () => {
    const { getByLabelText } = await renderWithProviders(<DbSelect />);

    await waitFor(() =>
      expect(getByLabelText("Choose a List")).toBeInTheDocument()
    );

    expect(getByLabelText(/Saturday/)).toBeInTheDocument();
  });

  it("should render the list with the available options and an option for making a new list", async () => {
    const { getByRole, getByLabelText } = await renderWithProviders(
      <DbSelect />
    );

    await waitFor(() =>
      expect(getByLabelText("Choose a List")).toBeInTheDocument()
    );

    fireEvent.mouseDown(
      getByRole("button", { name: "Saturday Night", expanded: false })
    );

    expect(
      getByRole("option", { name: /Saturday/, selected: true })
    ).toBeInTheDocument();
    expect(
      getByRole("option", { name: /Family/, selected: false })
    ).toBeInTheDocument();
    expect(
      getByRole("option", { name: /New List/, selected: false })
    ).toBeInTheDocument();
  });

  it("should push to the home page and set a new list when clicking on an existing list", async () => {
    const { getByRole, getByLabelText } = await renderWithProviders(
      <DbSelect />
    );

    await waitFor(() =>
      expect(getByLabelText("Choose a List")).toBeInTheDocument()
    );

    fireEvent.mouseDown(
      getByRole("button", { name: /Saturday/, expanded: false })
    );
    fireEvent.click(getByRole("option", { name: /Family/, selected: false }));

    expect(pushMock).toHaveBeenCalledWith("/");
    expect(getByLabelText(/Family/)).toBeInTheDocument();
  });

  it("should push to the create page", async () => {
    const { getByRole, getByLabelText } = await renderWithProviders(
      <DbSelect />
    );

    await waitFor(() =>
      expect(getByLabelText("Choose a List")).toBeInTheDocument()
    );

    fireEvent.mouseDown(
      getByRole("button", { name: /Saturday/, expanded: false })
    );
    fireEvent.click(getByRole("option", { name: /New List/, selected: false }));

    expect(pushMock).toHaveBeenCalledWith("/create");
  });
});
