import isNil from "lodash/isNil";
import React from "react";
import TheatresIcon from "@mui/icons-material/Theaters";
import {
  interactivePoster,
  NoPoster,
  Poster,
  PosterLayout,
  Title,
  unselectedPoster,
  Year,
} from "./movie-poster.styles";

const MoviePoster = ({
  poster,
  title,
  year,
  selected,
  onClick,
  height = 200,
  className,
}) => (
  <PosterLayout
    sx={[
      onClick && interactivePoster,
      !isNil(selected) && !selected && unselectedPoster,
    ]}
    className={className}
    onClick={onClick}
  >
    <Poster sx={{ height }}>
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
  </PosterLayout>
);

export default MoviePoster;
