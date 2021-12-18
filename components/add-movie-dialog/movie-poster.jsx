import isNil from "lodash/isNil";
import React from "react";
import TheatresIcon from "@mui/icons-material/Theaters";
import {
  NoPoster,
  Poster,
  PosterLayout,
  Title,
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
    $interactive={!!onClick}
    $unselected={!isNil(selected) && !selected}
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
