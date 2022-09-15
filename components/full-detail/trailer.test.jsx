import { fireEvent, render } from "@testing-library/react";
import Trailer from "./trailer";

jest.mock("react-youtube", () => () => <div data-testid="youtube" />);

describe("trailer", () => {
  let test;

  beforeEach(() => {
    test = {
      trailerId: "test123",
      onComplete: jest.fn(),
    };
  });

  it("should call onComplete when clicking on the trailer component and overlay mode is enabled", async () => {
    const { getByLabelText } = render(
      <Trailer
        overlay
        trailerId={test.trailerId}
        onComplete={test.onComplete}
      />
    );

    fireEvent.click(getByLabelText("Trailer"));
    expect(test.onComplete).toHaveBeenCalled();
  });
});
