import { fireEvent, render, waitFor } from "@testing-library/react";
import ProfileMenu from "./profile-menu";

jest.mock("next/link", () => {
  const React = require("react");

  return ({ children, href }) =>
    React.cloneElement(React.Children.only(children), { href });
});

jest.mock("@auth0/nextjs-auth0", () => ({
  useUser: () => ({
    user: {
      name: "Test User",
      picture: "https://test.user.com/pic",
      email: "test.user@test.com",
    },
  }),
}));

describe("profile-menu", () => {
  it("should render the menu button with the user image when closed", () => {
    const { getByAltText } = render(<ProfileMenu />);
    expect(getByAltText("Test User")).toBeInTheDocument();
  });

  it("should render the profile menu when opened", () => {
    const { getByAltText, queryAllByAltText, getByText, getByRole } = render(
      <ProfileMenu />
    );
    expect(queryAllByAltText("Test User")).toHaveLength(1); // Main button avatar
    fireEvent.click(getByAltText("Test User"));
    expect(queryAllByAltText("Test User")).toHaveLength(2); // Once opened, the larger avatar is in the menu as well
    expect(getByText("Test User")).toBeInTheDocument();
    expect(getByText("test.user@test.com")).toBeInTheDocument();
    expect(getByRole("link", { name: "Logout" })).toBeInTheDocument();
  });

  it("should logout when click", async () => {
    const { getByAltText, getByRole, queryAllByAltText } = render(
      <ProfileMenu />
    );
    fireEvent.click(getByAltText("Test User"));
    expect(getByRole("link", { name: "Logout" })).toHaveAttribute(
      "href",
      "/api/auth/logout"
    );
    fireEvent.click(getByRole("link", { name: "Logout" }));
    await waitFor(() => expect(queryAllByAltText("Test User")).toHaveLength(1)); // Main button avatar only
  });

  it("should close when clicking outside", async () => {
    const { getByAltText, queryByRole, queryAllByAltText } = render(
      <ProfileMenu />
    );

    fireEvent.click(getByAltText("Test User"));

    expect(queryAllByAltText("Test User")).toHaveLength(2); // Once opened, the larger avatar is in the menu as well

    // Couldn't figure out a better way to make this work.
    // There's some discussion here but seems the click away listener is not "armed" immediately due to a react bug.
    // I've needed to use a wait here to make sure the click away is ready.
    // https://github.com/mui/material-ui/issues/24783#issuecomment-774054038
    await new Promise((r) => setTimeout(r, 1));

    fireEvent.click(document);

    await waitFor(() => {
      expect(queryAllByAltText("Test User")).toHaveLength(1); // Main button avatar

      expect(queryByRole("link", { name: "Logout" })).not.toBeInTheDocument();
    });
  });
});
