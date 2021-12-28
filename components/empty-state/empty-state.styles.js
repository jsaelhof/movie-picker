import { styled } from "@mui/material";

export const EmptyListLayout = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridAutoFlow: "row",
  justifyItems: "center",
  marginTop: spacing(8),
  height: "fit-content",
  gap: spacing(4),

  "@media (max-width: 500px)": {
    marginTop: spacing(6),
  },
}));

export const Img = styled("img")`
  max-width: 500px;
  max-height: 300px;

  @media (max-width: 600px) {
    max-width: 350px;
    max-height: 250px;
  }
`;

export const Message = styled("div")(({ theme: { palette, spacing } }) => ({
  textAlign: "center",
  fontSize: "1.25rem",
  color: palette.grey[800],
  paddingTop: spacing(6),
}));

export const Quote = styled("div")(({ theme: { palette } }) => ({
  fontFamily: "serif",
  fontSize: "1.25rem",
  fontStyle: "italic",
  color: palette.grey[500],
}));
