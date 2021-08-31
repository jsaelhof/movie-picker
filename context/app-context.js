import { createContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const minimalColumns = useMediaQuery({
    query: "(max-width: 736px)",
  });

  return (
    <AppContext.Provider value={{ minimalColumns }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
