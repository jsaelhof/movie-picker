import { renderWithProviders } from "../../utils/render-with-providers";
import NavFull from "./nav-full";
import { useRouter } from "next/router";
import { waitFor } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("nav-full", () => {
  it("should render the default nav options and list select component", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/",
    }));
    const { getByRole, getByLabelText } = await renderWithProviders(
      <NavFull />
    );

    await waitFor(() => {
      expect(getByLabelText("Choose a List")).toBeInTheDocument();
    });

    expect(getByRole("button", { name: "Movies" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Watched" })).toBeInTheDocument();
  });

  it("should render the 'pick' nav options", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/pick",
    }));
    const { getByRole } = await renderWithProviders(<NavFull />);

    await waitFor(() => {
      expect(
        getByRole("button", { name: "Return to Movies" })
      ).toBeInTheDocument();
      expect(getByRole("button", { name: "Pick Again" })).toBeInTheDocument();
    });
  });

  it("should render the 'create' nav options", async () => {
    useRouter.mockImplementation(() => ({
      pathname: "/create",
    }));
    const { getByRole } = await renderWithProviders(<NavFull />);

    await waitFor(() =>
      expect(
        getByRole("button", { name: "Return to Movies" })
      ).toBeInTheDocument()
    );
  });
});
