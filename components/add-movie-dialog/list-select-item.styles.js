import { styled } from "@mui/material";

export const Item = styled("div")(({ theme: { spacing }, value }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: spacing(1),

  ...(value === 0 && {
    fontStyle: "italic",
  }),
}));
