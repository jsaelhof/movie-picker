import { fireEvent, render } from "@testing-library/react";
import Logo from "./logo";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("logo", () => {
  it("shold navigate to the root on click", () => {
    const { getByLabelText } = render(<Logo />);
    fireEvent.click(getByLabelText("Movie Decider 4000"));
    expect(pushMock).toBeCalledWith("/");
  });
});
