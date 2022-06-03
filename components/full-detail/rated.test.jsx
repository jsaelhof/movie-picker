import { render } from "@testing-library/react";
import Rated from "./rated";

describe("rated", () => {
  it("should display the rating", () => {
    const { getByText } = render(<Rated rated="PG-13" />);
    expect(getByText("PG-13")).toBeInTheDocument();
  });

  it("should not render anything whne rated is null", () => {
    const { queryByTestId } = render(<Rated rated={null} />);
    expect(queryByTestId("rated")).not.toBeInTheDocument();
  });
});
