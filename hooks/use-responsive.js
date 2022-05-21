import { useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const mobile = useMediaQuery("(max-width: 500px)");
  const small = useMediaQuery("(max-width: 575px)");
  const medium = useMediaQuery("(max-width: 736px)");

  return {
    small,
    mobile,
    medium,
  };
};
