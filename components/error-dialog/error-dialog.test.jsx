import { fireEvent, render } from "@testing-library/react";
import ErrorDialog from "./error-dialog";

describe("error-dialog", () => {
  let props;

  beforeEach(() => {
    props = {
      open: true,
      content: "This is the error content",
      onConfirm: jest.fn(),
    };
  });

  it("should display the content when open", () => {
    const { getByText } = render(<ErrorDialog {...props} />);
    expect(getByText(props.content)).toBeInTheDocument();
  });

  it("should not display the content when closed", () => {
    const { queryByText } = render(<ErrorDialog {...props} open={false} />);
    expect(queryByText(props.content)).not.toBeInTheDocument();
  });

  it("should call onConfirm when the dialog Ok button is pressed", () => {
    const { getByRole } = render(<ErrorDialog {...props} />);
    fireEvent.click(getByRole("button", { name: "Ok" }));
    expect(props.onConfirm).toHaveBeenCalled();
  });
});
