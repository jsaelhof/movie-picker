import { styled } from "@mui/material";

export const Nav = styled("div")(({ theme: { spacing, breakpoints } }) => ({
  gridArea: "nav",
  flexGrow: 1,
  display: "grid",
  gridAutoFlow: "column",
  gap: spacing(3),
  justifyContent: "flex-end",
  alignItems: "center",
  margin: `0 ${spacing(6)} 0 0`,

  [breakpoints.down(640)]: {
    marginRight: 24,
    gap: 8,
  },
}));
