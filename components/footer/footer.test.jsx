import { render } from "@testing-library/react";
import Footer from "./footer";

describe("footer", () => {
  it("should render the nav with the correct urls", () => {
    const { getByRole } = render(<Footer />);
    expect(getByRole("link", { name: "Movies" })).toHaveAttribute("href", "/");
    expect(getByRole("link", { name: "Watched" })).toHaveAttribute(
      "href",
      "/watched"
    );
  });
});
