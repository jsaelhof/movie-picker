import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { AppProvider } from "../context/app-context";
import { GET_LISTS } from "../graphql/queries";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";

export const renderWithProviders = async (children, options) => {
  const RenderWrapper = ({ children }) => (
    <MockedProvider mocks={[GET_LISTS_MOCK]} addTypename={false}>
      <ThemeProvider theme={theme}>
        <AppProvider>{children}</AppProvider>
      </ThemeProvider>
    </MockedProvider>
  );

  const result = render(children, { wrapper: RenderWrapper, ...options });

  // Await for one tick to make sure that the mock query responses are not in the loading state
  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

  return result;
};

const GET_LISTS_MOCK = {
  request: {
    query: GET_LISTS,
  },
  result: {
    data: {
      lists: [
        {
          id: "saturday",
          label: "Saturday Night",
        },
        {
          id: "family",
          label: "Family Movie Night",
        },
      ],
    },
  },
};
