import { renderWithProviders } from "../../utils/render-with-providers";
import { useRouter } from "next/router";
import { fireEvent, waitFor } from "@testing-library/react";
import NavHamburger from "./nav-hamburger";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("nav-hamburger", () => {
  it("should render the default nav options", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/",
    }));

    const { getByTestId, getByRole } = await renderWithProviders(
      <NavHamburger />
    );

    await waitFor(() => {
      expect(getByTestId("MenuIcon")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("MenuIcon"));

    expect(getByRole("menuitem", { name: "Watched" })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /Saturday/ })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /Family/ })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /New List/ })).toBeInTheDocument();
  });

  it("should render the 'watched' nav options", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/watched",
    }));

    const { getByTestId, getByRole } = await renderWithProviders(
      <NavHamburger />
    );

    await waitFor(() => {
      expect(getByTestId("MenuIcon")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("MenuIcon"));

    expect(getByRole("menuitem", { name: "Movies" })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /Saturday/ })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /Family/ })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /New List/ })).toBeInTheDocument();
  });

  it("should render the 'pick' nav options", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/pick",
    }));

    const { getByTestId, getByRole } = await renderWithProviders(
      <NavHamburger />
    );

    await waitFor(() => {
      expect(getByTestId("MenuIcon")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("MenuIcon"));

    expect(getByRole("menuitem", { name: "Pick again" })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: "Movies" })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: "Watched" })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /Saturday/ })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /Family/ })).toBeInTheDocument();
    expect(getByRole("menuitem", { name: /New List/ })).toBeInTheDocument();
  });

  it("should render the default 'create' nav options", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/create",
    }));

    const { getByTestId, getByRole } = await renderWithProviders(
      <NavHamburger />
    );

    await waitFor(() => {
      expect(getByTestId("MenuIcon")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("MenuIcon"));

    expect(getByRole("menuitem", { name: "Movies" })).toBeInTheDocument();
  });
});
