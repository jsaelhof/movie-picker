import { styled } from "@mui/material";

export const Container = styled("div")(({ $right }) => ({
  position: "relative",
  display: "flex",
  alignItems: "end",
  justifyContent: $right ? "flex-end" : "flex-start",
  padding: "24px",
  columnGap: 24,
  boxShadow: "inset 0 0 20px rgba(0,0,0,25%)",
  backgroundImage: "linear-gradient(to top, #eee, #bbb)",

  "@media (min-width: 1000px)": {
    ...($right
      ? { paddingRight: "calc((100% - 1000px) / 2)" }
      : { paddingLeft: "calc((100% - 1000px) / 2)" }),
  },
}));

export const Editing = {
  zIndex: 100000,
};

export const BackdropWrapper = styled("div")(() => ({
  position: "absolute",
  inset: 0,
  maskImage:
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 40%, rgba(0,0,0,0.1) 100%)",
}));

export const Backdrop = styled("div")(() => ({
  backgroundPosition: "center 20%",
  backgroundSize: "cover",
  height: "100%",
}));

export const PosterLayout = styled("div")(() => ({
  boxShadow:
    "3px 10px 10px rgba(0, 0, 0, 0.1), 0px 5px 15px 0px rgba(0, 0, 0, 0.1), 0px 1px 20px 0px rgba(0, 0, 0, 0.12)",
}));

export const InfoLayout = styled("div")(({ theme, $right }) => ({
  color: theme.palette.grey[900],
  textShadow: "0 0 3px white",
  textAlign: $right ? "right" : "left",
  zIndex: 1,
}));

export const InfoTitle = styled("div")(() => ({
  fontSize: "2rem",
  fontWeight: "bold",
}));

export const InfoDate = styled("div")(() => ({
  position: "relative",
  fontSize: "1.25rem",
  cursor: "pointer",
}));
