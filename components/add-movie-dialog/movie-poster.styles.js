import { styled } from "@mui/material";

export const PosterLayout = styled("div")(
  ({ theme: { palette, spacing } }) => ({
    display: "grid",
    gridAutoFlow: "row",
    alignItems: "center",
    color: palette.grey[800],
    transition: "all 400ms",
    paddingLeft: spacing(0.5),
    paddingRight: spacing(0.5),

    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.4)",
    },
  })
);

export const interactivePoster = ({ spacing }) => ({
  paddingTop: spacing(0.5),

  "& :hover > img": {
    transform: `translateY(${spacing(-0.5)})`,
    boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.25)",
  },
});

export const unselectedPoster = {
  opacity: 0.25,
};

export const Poster = styled("div")(({ theme: { palette } }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: palette.grey[800],
}));

export const NoPoster = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: 128,
  height: 200,
  background: "#f7f7fc",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.15)",
}));

export const Title = styled("div")(({ theme: { spacing } }) => ({
  width: "100%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  marginTop: spacing(1),
}));

export const Year = styled("div")`
  font-size: 0.8em;
  text-align: center;
`;
