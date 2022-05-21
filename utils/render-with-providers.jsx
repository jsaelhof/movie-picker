import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { AppProvider } from "../context/app-context";
import { GET_LISTS } from "../graphql/queries";

export const renderWithProviders = (children) =>
  render(
    <MockedProvider mocks={[GET_LISTS_MOCK]} addTypename={false}>
      <AppProvider>{children}</AppProvider>
    </MockedProvider>
  );

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
