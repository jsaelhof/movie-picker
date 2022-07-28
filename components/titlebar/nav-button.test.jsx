import { fireEvent, render } from "@testing-library/react";
import NavButton from "./nav-button";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("nav-button", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should navigate to the provided href", () => {
    const { getByRole } = render(
      <NavButton href="/test">Test Button</NavButton>
    );
    fireEvent.click(getByRole("button", { name: "Test Button" }));
    expect(pushMock).toBeCalledWith("/test");
  });

  it("should call the provided onClick", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <NavButton onClick={onClick}>Test Button</NavButton>
    );
    fireEvent.click(getByRole("button", { name: "Test Button" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("should prefer onClick over the href if both are provided", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <NavButton herf="/test" onClick={onClick}>
        Test Button
      </NavButton>
    );
    fireEvent.click(getByRole("button", { name: "Test Button" }));
    expect(onClick).toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("should render the provided children", () => {
    const { getByText } = render(
      <NavButton herf="/test">
        <div>Content</div>
      </NavButton>
    );
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("should pass through props to the button", () => {
    const { getByLabelText } = render(
      <NavButton herf="/test" aria-label="testButton">
        Test Button
      </NavButton>
    );
    expect(getByLabelText("testButton")).toBeInTheDocument();
  });
});
