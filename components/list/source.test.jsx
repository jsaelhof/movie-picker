import React from "react";
import { render } from "@testing-library/react";
import Source from "./source";
import { sourceLogos, sources } from "../../constants/sources";

describe("empty-list", () => {
  it("should render the correct source and logo", () => {
    const { getByLabelText } = render(<Source source={sources.NETFLIX} />);
    expect(getByLabelText("Netflix")).toBeInTheDocument();
    expect(getByLabelText("Netflix")).toHaveStyle(
      `background-image: url(${sourceLogos[sources.NETFLIX]})`
    );
  });
});
