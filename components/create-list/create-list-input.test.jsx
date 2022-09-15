import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/render-with-providers";
import CreateListInput from "./create-list-input";

describe("create-list-input", () => {
  let test;

  beforeEach(() => {
    test = {
      onSubmit: jest.fn(),
    };
  });

  it("should callback with the new list name on submit", async () => {
    const { getByRole, getByLabelText } = await renderWithProviders(
      <CreateListInput onSubmit={test.onSubmit} />
    );
    fireEvent.change(getByLabelText("New List Name"), {
      target: { value: "My List" },
    });
    fireEvent.click(getByRole("button", { name: "Create List" }));
    expect(test.onSubmit).toHaveBeenCalledWith("My List");
  });

  it("should display an error if the list name already exists", async () => {
    const { getByRole, getByLabelText, getByText } = await renderWithProviders(
      <CreateListInput onSubmit={test.onSubmit} />
    );

    fireEvent.change(getByLabelText("New List Name"), {
      target: { value: "Saturday Night" },
    });
    fireEvent.click(getByRole("button", { name: "Create List" }));
    expect(
      getByText("There is already a list with this name")
    ).toBeInTheDocument();
    expect(test.onSubmit).not.toHaveBeenCalled();
  });

  it("should display an error if the list name is empty", async () => {
    const { getByRole, getByText } = await renderWithProviders(
      <CreateListInput onSubmit={test.onSubmit} />
    );

    fireEvent.click(getByRole("button", { name: "Create List" }));
    expect(getByText("Please enter a name for your list")).toBeInTheDocument();
    expect(test.onSubmit).not.toHaveBeenCalled();
  });
});
