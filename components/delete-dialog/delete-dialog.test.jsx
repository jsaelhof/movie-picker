import { render, fireEvent } from "@testing-library/react";
import DeleteDialog from "./delete-dialog";

describe("delete-dialog", () => {
  let props;

  beforeEach(() => {
    props = {
      content: "This movie will be removed",
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
    };
  });

  it("should show the content in the dialog", () => {
    const { getByText } = render(<DeleteDialog open {...props} />);
    expect(getByText(props.content)).toBeInTheDocument();
  });

  it("should call onConfirm", async () => {
    const { getByRole } = render(<DeleteDialog open {...props} />);
    fireEvent.click(getByRole("button", { name: "Delete" }));
    expect(props.onConfirm).toHaveBeenCalled();
  });

  it("should call onCancel", () => {
    const { getByRole } = render(<DeleteDialog open {...props} />);
    fireEvent.click(getByRole("button", { name: "Cancel" }));
    expect(props.onCancel).toHaveBeenCalled();
  });

  it("should not show the dialog when open is false", () => {
    const { queryByText } = render(<DeleteDialog open={false} {...props} />);
    expect(queryByText(props.content)).not.toBeInTheDocument();
  });

  it("should call onCancel when the backdrop on the dialog is clicked", async () => {
    render(<DeleteDialog open {...props} />);
    fireEvent.click(document.getElementsByClassName("MuiBackdrop-root")[0]);
    expect(props.onCancel).toHaveBeenCalled();
  });
});
