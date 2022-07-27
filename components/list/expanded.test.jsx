import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Expanded from "./expanded";

// Mock the full detail component to make this test simpler
const onCloseMock = jest.fn();
jest.mock("../full-detail/full-detail", () => () => (
  <div aria-label="fullDetailMock">
    <button onClick={onCloseMock}>Close</button>
  </div>
));

describe("empty-list", () => {
  let props;

  beforeEach(() => {
    props = {
      movie: {},
      preload: false,
      open: false,
      centerPoint: { x: 0, y: 0 },
      onClose: jest.fn(),
    };
  });

  it("should not render the full detail mock or backdrop when open and preload are false", () => {
    const { queryByLabelText, queryByTestId } = render(<Expanded {...props} />);
    expect(queryByLabelText("fullDetailMock")).not.toBeInTheDocument();
    expect(queryByTestId("backdrop")).not.toBeInTheDocument();
  });

  it("should render the full detail mock and backdrop when open is true", () => {
    const { getByLabelText, getByTestId } = render(
      <Expanded {...props} open={true} />
    );
    expect(getByLabelText("fullDetailMock")).toBeInTheDocument();
    expect(getByTestId("backdrop")).toBeInTheDocument();
  });

  it("should render the full detail mock but not the backdrop when preload is true", () => {
    const { getByLabelText, queryByTestId } = render(
      <Expanded {...props} preload={true} />
    );
    expect(getByLabelText("fullDetailMock")).toBeInTheDocument();
    expect(queryByTestId("backdrop")).not.toBeInTheDocument();
  });

  it("should call onClose when clicking on the backdrop", async () => {
    const { getByTestId } = render(<Expanded {...props} open={true} />);
    expect(getByTestId("backdrop")).toBeInTheDocument();
    fireEvent.click(getByTestId("backdrop"));
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should call onClose when clicking on the full detail close button", async () => {
    const { getByLabelText, getByRole } = render(
      <Expanded {...props} open={true} />
    );
    expect(getByLabelText("fullDetailMock")).toBeInTheDocument();
    fireEvent.click(getByRole("button", { name: "Close" }));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
