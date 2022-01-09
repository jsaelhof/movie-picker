import { IconButton, styled } from "@mui/material";
import { animated } from "react-spring";

import StarRating from "../ratings/star-rating";

export const FullDetailLayout = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const CloseButton = styled("div")`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 100;
  color: white;
  cursor: pointer;
  mix-blend-mode: exclusion;
`;

export const BackdropWrapper = styled("div")`
  display: grid;
  grid-template-areas: "main";
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 50%,
    transparent 100%
  );
  height: 60vh;
  width: 100%;

  @media (max-width: 2000px) {
    height: 65vh;
  }

  @media (max-width: 1200px) {
    height: 60vh;
  }

  @media (max-width: 750px) {
    height: 50vh;
  }
`;

export const Backdrop = styled(animated.div)`
  grid-area: main;
  background-size: cover;
  background-position-x: center;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to top, white, #ccc);
`;

export const TrailerLayout = styled("div")`
  grid-area: main;
`;

export const MovieInfo = styled("div")`
  margin: -160px 32px 32px 32px;
  display: grid;
  grid-template-areas:
    "poster title title"
    "poster info source"
    "poster plot plot"
    "poster actions actions";
  grid-template-rows: 130px 40px auto 45px;
  grid-template-columns: max-content 1fr max-content;
  max-width: 960px;
  min-height: 400px;
  z-index: 10;

  @media (max-width: 2000px) {
    margin-top: -200px;
  }

  @media (max-width: 1200px) {
    margin-top: -180px;
  }

  @media (max-width: 750px) {
    margin-top: -120px;
    grid-template-rows: 100px 40px auto 45px;
  }

  @media (max-width: 660px) {
    margin-top: -150px;
    grid-template-areas:
      "poster poster"
      "title title"
      "info source"
      "plot plot"
      "actions actions";
    grid-template-rows: 300px auto 40px max-content auto 45px;
    grid-template-columns: 1fr;
    min-height: 300px;
  }
`;

export const Poster = styled(animated.div)`
  grid-area: poster;
  margin-right: 32px;
  height: fit-content;
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.1),
    0px 5px 15px 0px rgba(0, 0, 0, 0.1), 0px 1px 20px 0px rgba(0, 0, 0, 0.12);

  @media (max-width: 660px) {
    margin-right: 0;
    justify-self: center;
  }
`;

export const MovieTitle = styled("div")`
  grid-area: title;
  font-size: 48px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[900]};
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  text-shadow: 0 0 3px white;
  margin-bottom: 8px;

  @media (max-width: 660px) {
    font-size: 32px;
    align-items: center;
    text-align: center;

    ${({ theme: { spacing } }) => ({
      paddingTop: spacing(3),
      marginBottom: spacing(2),
    })}
  }
`;

export const smallMovieTitle = {
  fontSize: 32,
};

export const StyledStarRating = styled(StarRating)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  grid-area: ratings;
`;

export const MovieData = styled("div")`
  padding: 0;
  display: grid;
  column-gap: ${({ theme }) => theme.spacing(3)};
  grid-auto-flow: column;
  grid-template-columns: repeat(3, max-content) 1fr;
  font-size: 14px;
  align-items: center;
  grid-area: info;
  color: ${({ theme }) => theme.palette.grey[900]};

  @media (max-width: 750px) {
    column-gap: 20px;
  }

  @media (max-width: 660px) {
    column-gap: ${({ theme }) => theme.spacing(2)};
  }
`;

export const Source = styled("img")`
  grid-area: source;
  height: 40px;
  margin-left: auto;
`;

export const streamable = {
  cursor: "pointer",
  "&:hover": { transform: "scale(1.1)" },
};

export const Plot = styled("div")`
  grid-area: plot;
  line-height: 1.7;
  ${({ theme: { palette, spacing } }) => ({
    color: palette.grey[900],
    paddingTop: spacing(2),
    paddingBottom: spacing(3),
  })}
`;

export const Actions = styled("div")`
  grid-area: actions;
  display: grid;
  grid-auto-flow: column;
  column-gap: ${({ theme }) => theme.spacing(4)};
  justify-content: flex-start;

  @media (max-width: 660px) {
    justify-content: center;
  }

  @media (max-width: 450px) {
    button {
      display: grid;
    }

    span {
      justify-items: center;
    }
  }
`;
