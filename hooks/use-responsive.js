import { useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const mobile = useMediaQuery("(max-width: 500px)");
  const small = useMediaQuery("(max-width: 575px)");
  const minimalColumns = useMediaQuery("(max-width: 736px)");

  return {
    small,
    mobile,
    minimalColumns,
    fullFeatures: !minimalColumns,
  };
};
