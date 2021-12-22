import { useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useCallback } from "react";
import { createContext, useState } from "react";
import { GET_LISTS, GET_MOVIES } from "../graphql";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const { user } = useUser(); // TODO: Handle errors, here and on getting lists. Maybe expose an error on the context and have the app show an error page.
  const [list, _setList] = useState();
  const { lists } = useLists(user?.sub, _setList);
  const { movies, watchedMovies, loading: loadingMovies } = useMovies(list);
  const [order, setOrder] = useState(["addedOn", "desc"]);
  const [pick, setPick] = useState(null);

  // Expost a list change function so that we can clear any state from the old list while changing to a new one
  const setList = useCallback((val) => {
    setPick(null);
    _setList(val);
  }, []);

  const context = {
    lists,
    list,
    setList,
    movies,
    watchedMovies,
    loadingMovies,
    order,
    setOrder,
    pick,
    setPick,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const useLists = (userId, onComplete) => {
  const { data } = useQuery(GET_LISTS, {
    skip: !userId,
    variables: { userId },
    onCompleted: ({ lists }) => {
      onComplete(lists[0]);
    },
  });

  return { ...data };
};

const useMovies = (list) => {
  const { data, refetch, loading } = useQuery(GET_MOVIES, {
    skip: !list,
    variables: { list: list?.id },
  });

  return {
    ...data,
    refetchMovies: refetch,
    loading,
  };
};

export { AppProvider, useAppContext };
