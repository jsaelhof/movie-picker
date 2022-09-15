import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { AppProvider } from "../context/app-context";
import { GET_LISTS, GET_MOVIES } from "../graphql/queries";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";

jest.mock("@auth0/nextjs-auth0", () => ({
  useUser: () => ({
    user: {
      email: "test@gmail.com",
      email_verified: true,
      name: "Test User",
      nickname: "test",
      picture:
        "https://s.gravatar.com/avatar/4?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjs.png",
      sub: "auth0|611762",
      updated_at: "2022-07-30T02:07:18.011Z",
    },
  }),
}));

export const renderWithProviders = async (
  children,
  mocks = [],
  options = {}
) => {
  const RenderWrapper = ({ children }) => (
    <MockedProvider
      mocks={[GET_LISTS_MOCK, GET_MOVIES_MOCK, ...mocks]}
      addTypename={false}
    >
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

const GET_MOVIES_MOCK = {
  request: {
    query: GET_MOVIES,
    variables: {
      list: "saturday",
    },
  },
  result: {
    data: {
      movies: [
        {
          id: "7614bdcb-d21a-40d8-880d-aae8cbfccb56",
          title: "Blade Runner",
          list: "saturday",
          runtime: 7020,
          source: 1,
          genre: 3,
          year: "1982",
          poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          imdbID: "tt0083658",
          locked: false,
          addedOn: "2021-01-16T06:39:48.002Z",
          watchedOn: null,
          ratings: {
            id: "7614bdcb-d21a-40d8-880d-aae8cbfccb56",
            IMDB: "81%",
            ROTTEN_TOMATOES: "89%",
            METACRITIC: "84%",
            __typename: "Ratings",
          },
          background: null,
          __typename: "Movie",
        },
        {
          id: "f8b5063e-8904-49f1-a5c3-5b12e7c57699",
          title: "Glory",
          list: "saturday",
          runtime: 7320,
          source: 1,
          genre: 2,
          year: "1989",
          poster:
            "https://m.media-amazon.com/images/M/MV5BODhlNjA5MDEtZDVhNS00ZmM3LTg1YzAtZGRjNjhjNTAzNzVkXkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg",
          imdbID: "tt0097441",
          locked: false,
          addedOn: "2021-01-15T00:00:25.000Z",
          watchedOn: null,
          ratings: {
            id: "f8b5063e-8904-49f1-a5c3-5b12e7c57699",
            IMDB: "78%",
            ROTTEN_TOMATOES: "93%",
            METACRITIC: "78%",
            __typename: "Ratings",
          },
          background: null,
          __typename: "Movie",
        },
        {
          id: "ea8d443b-a4a2-4e0d-9417-e54be3907354",
          title: "Roman J. Israel, Esq.",
          list: "saturday",
          runtime: 7320,
          source: 0,
          genre: 2,
          year: "2017",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMjMyNjkxMTg2NV5BMl5BanBnXkFtZTgwNjkyNTk0MzI@._V1_SX300.jpg",
          imdbID: "tt6000478",
          locked: false,
          addedOn: "2021-01-15T00:00:25.000Z",
          watchedOn: null,
          ratings: {
            id: "ea8d443b-a4a2-4e0d-9417-e54be3907354",
            IMDB: "65%",
            ROTTEN_TOMATOES: "54%",
            METACRITIC: "58%",
            __typename: "Ratings",
          },
          background: null,
          __typename: "Movie",
        },
      ],
      watchedMovies: [
        {
          id: "fb96baa5-b22c-4306-9dec-163bec4b1faa",
          title: "Tower Heist",
          list: "saturday",
          runtime: 6240,
          source: 1,
          genre: 1,
          year: "2011",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMTY1NDQxMTcwOV5BMl5BanBnXkFtZTcwNzMzNTExNg@@._V1_SX300.jpg",
          imdbID: "tt0471042",
          locked: false,
          addedOn: "2021-05-09T03:37:42.974Z",
          watchedOn: "2021-09-26T04:11:43.269Z",
          ratings: {
            id: "fb96baa5-b22c-4306-9dec-163bec4b1faa",
            IMDB: "62%",
            ROTTEN_TOMATOES: "68%",
            METACRITIC: "59%",
            __typename: "Ratings",
          },
          background: null,
          __typename: "Movie",
        },
        {
          id: "0e916dfd-7302-41f4-913f-72b2ea3ba2c0",
          title: "Always Be My Maybe",
          list: "saturday",
          runtime: 6060,
          source: 1,
          genre: 1,
          year: "2019",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMGM2NWFjYTctZjFiYy00YzIxLThhY2QtY2UxZTNmNjdjZTU0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          imdbID: "tt7374948",
          locked: false,
          addedOn: "2021-05-02T16:21:08.696Z",
          watchedOn: "2022-01-14T07:00:00.000Z",
          ratings: {
            id: "0e916dfd-7302-41f4-913f-72b2ea3ba2c0",
            IMDB: "68%",
            ROTTEN_TOMATOES: "90%",
            METACRITIC: "64%",
            __typename: "Ratings",
          },
          background: null,
          __typename: "Movie",
        },
      ],
    },
  },
};
