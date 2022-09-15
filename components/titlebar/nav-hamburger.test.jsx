import { renderWithProviders } from "../../utils/render-with-providers";
import { useRouter } from "next/router";
import { fireEvent, render, waitFor } from "@testing-library/react";
import NavHamburger from "./nav-hamburger";
import { AppContext } from "../../context/app-context";

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

  it("should not render the menu on the 'create' screen when there are no lists created yet", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/create",
    }));

    const { queryByTestId } = render(
      <AppContext.Provider value={{ list: undefined }}>
        <NavHamburger />
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(queryByTestId("MenuIcon")).not.toBeInTheDocument();
    });
  });

  it("should close when clicking outside", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/",
    }));

    const { getByTestId, getByRole, queryByRole } = await renderWithProviders(
      <NavHamburger />
    );

    await waitFor(() => {
      expect(getByTestId("MenuIcon")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("MenuIcon"));

    expect(getByRole("menuitem", { name: "Watched" })).toBeInTheDocument();

    // Couldn't figure out a better way to make this work.
    // There's some discussion here but seems the click away listener is not "armed" immediately due to a react bug.
    // I've needed to use a wait here to make sure the click away is ready.
    // https://github.com/mui/material-ui/issues/24783#issuecomment-774054038
    await new Promise((r) => setTimeout(r, 1));

    fireEvent.click(document);

    await waitFor(() =>
      expect(
        queryByRole("menuitem", { name: "Watched" })
      ).not.toBeInTheDocument()
    );
  });
});
