import isNil from "lodash/isNil";
import React from "react";
import TheatresIcon from "@mui/icons-material/Theaters";
import { styled } from "@mui/material";

const MoviePoster = ({
  poster,
  title,
  year,
  selected,
  onClick,
  height = 200,
  className,
}) => (
  <PosterContainer
    $interactive={!!onClick}
    $unselected={!isNil(selected) && !selected}
    className={className}
    onClick={onClick}
  >
    <Poster $height={height}>
      {poster === "N/A" || !poster ? (
        <NoPoster>
          <TheatresIcon fontSize="large" />
          No Poster
        </NoPoster>
      ) : (
        <img src={poster} />
      )}
    </Poster>
    {title && <Title>{title}</Title>}
    {year && <Year>{year}</Year>}
  </PosterContainer>
);

const PosterContainer = styled("div")(
  ({ theme: { palette, spacing }, $interactive, $unselected }) => ({
    display: "grid",
    gridAutoFlow: "row",
    alignItems: "center",
    color: palette.grey[800],
    transition: "all 400ms",
    paddingLeft: spacing(0.5),
    paddingRight: spacing(0.5),

    ...($unselected && {
      opacity: 0.25,
    }),

    ...($interactive && {
      paddingTop: spacing(0.5),
    }),

    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.4)",
    },

    "& :hover > img": {
      ...($interactive && {
        transform: `translateY(${spacing(-0.5)})`,
        boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.25)",
      }),
    },
  })
);

const Poster = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.grey[800]};
  height: ${({ $height }) => $height};
`;

const NoPoster = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 128px;
  height: 200px;
  background: #f7f7fc;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
`;

const Title = styled("div")`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-top: ${({ theme: { spacing } }) => spacing(1)};
`;

const Year = styled("div")`
  font-size: 0.8em;
  text-align: center;
`;

export default MoviePoster;
