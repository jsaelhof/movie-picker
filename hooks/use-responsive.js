import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const minimalColumns = useMediaQuery({
    query: "(max-width: 736px)",
  });

  return {
    minimalColumns,
    fullFeatures: !minimalColumns,
  };
};
