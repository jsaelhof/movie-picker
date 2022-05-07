import React, { useCallback } from "react";
import { createContext, useState } from "react";
import { useGetLists, useGetMovies } from "../graphql/queries";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [list, _setList] = useState();
  const { lists } = useGetLists({ onCompleted: _setList });
  const {
    movies,
    moviesById,
    watchedMovies,
    loading: loadingMovies,
  } = useGetMovies(list);
  const [order, setOrder] = useState(["addedOn", "desc"]);
  const [pick, setPick] = useState(null);

  // Expose a list change function so that we can clear any state from the old list while changing to a new one
  const setList = useCallback((val) => {
    setPick(null);
    _setList(val);
  }, []);

  const clearPick = useCallback(() => {
    setPick(null);
  }, []);

  const context = {
    lists,
    list,
    setList,
    movies,
    moviesById,
    watchedMovies,
    loadingMovies,
    order,
    setOrder,
    pick,
    setPick,
    clearPick,
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

export { AppProvider, useAppContext };
