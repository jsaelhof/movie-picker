import { styled } from "@mui/material";

export const RatedContainer = styled("div")(
  ({ theme: { palette, spacing } }) => ({
    minWidth: 10,
    width: "fit-content",
    height: 18,
    border: `2px solid ${palette.grey[900]}`,
    borderRadius: 4,
    textAlign: "center",
    padding: `0 ${spacing(0.5)}`,
    color: palette.grey[900],
  })
);
