import { styled } from "@mui/material";

export const SortNavList = styled("ul")(
  ({ theme: { breakpoints, spacing } }) => ({
    flexGrow: 1,
    display: "flex",
    padding: 0,
    alignItems: "baseline",
    justifyContent: "flex-start",

    [breakpoints.down(575)]: {
      justifyContent: "center",
      marginTop: spacing(4),
      marginBottom: 0,
    },
  })
);

export const SortNavListItem = styled("li")(
  ({ theme: { palette, spacing } }) => ({
    listStyleType: "none",
    marginLeft: spacing(2),
    fontSize: "0.8rem",
    cursor: "pointer",
    color: palette.grey[700],
    paddingBottom: spacing(0.5),
  })
);

export const sortNavSelectedItem = ({ palette }) => ({
  fontSize: "1rem",
  color: "initial",
  borderBottom: `1px solid ${palette.accent}`,
});
