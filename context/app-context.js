import { useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { createContext, useState } from "react";
import { GET_LISTS, GET_MOVIES } from "../graphql";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [list, _setList] = useState();
  const { lists } = useLists(_setList);
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

const useLists = (onComplete) => {
  const { data } = useQuery(GET_LISTS, {
    onCompleted: ({ lists }) => {
      onComplete(lists[0]);
    },
  });

  return { ...data };
};

const useMovies = (list) => {
  const { data, loading } = useQuery(GET_MOVIES, {
    skip: !list,
    variables: { list: list?.id },
  });

  return {
    ...data,
    loading,
  };
};

export { AppProvider, useAppContext };
