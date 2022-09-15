import { fireEvent, render } from "@testing-library/react";
import ActionButton from "./action-button";
import { Close } from "@mui/icons-material";

describe("action-button", () => {
  let test;

  beforeEach(() => {
    test = {
      onClick: jest.fn(),
      tooltip: "test tooltip",
      movie: {
        id: 123,
      },
    };
  });

  it("should render the button", () => {
    const { getByTestId, getByLabelText } = render(
      <ActionButton
        Icon={Close}
        onClick={test.onClick}
        tooltip={test.tooltip}
      />
    );

    expect(getByLabelText(test.tooltip)).toBeInTheDocument();
    expect(getByTestId("CloseIcon")).toBeInTheDocument();
  });

  it("should return the movie data when clicked", () => {
    const { getByLabelText } = render(
      <ActionButton
        Icon={Close}
        onClick={test.onClick}
        tooltip={test.tooltip}
        movie={test.movie}
      />
    );

    fireEvent.click(getByLabelText(test.tooltip));
    expect(test.onClick).toHaveBeenCalledWith(test.movie);
  });

  it("should not fire onClick when disabled", () => {
    const { getByLabelText } = render(
      <ActionButton
        Icon={Close}
        onClick={test.onClick}
        tooltip={test.tooltip}
        movie={test.movie}
        disabled
      />
    );

    fireEvent.click(getByLabelText(test.tooltip));
    expect(test.onClick).not.toHaveBeenCalled();
  });
});
