import { fireEvent, render } from "@testing-library/react";
import CreateListError from "./create-list-error";

describe("create-list-error", () => {
  let test;

  beforeEach(() => {
    test = {
      reset: jest.fn(),
    };
  });

  it("should run the reset callback when Try Again is pressed", () => {
    const { getByRole } = render(<CreateListError reset={test.reset} />);
    fireEvent.click(getByRole("button", { name: "Try Again" }));
    expect(test.reset).toHaveBeenCalled();
  });
});
