import { useMediaQuery } from "@material-ui/core";

export const useResponsive = () => {
  const mobile = useMediaQuery("(max-width: 500px)");
  const minimalColumns = useMediaQuery("(max-width: 736px)");

  return {
    mobile,
    minimalColumns,
    fullFeatures: !minimalColumns,
  };
};
