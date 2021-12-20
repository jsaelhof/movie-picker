import React from "react";
import TheatresIcon from "@mui/icons-material/Theaters";

import { active, locked, NoPoster, Poster } from "./movie-poster.styles";

const MoviePoster = ({ movie, height = 250, onClick }) => {
  const posterStyles = {
    width: height * 0.64,
    height,
  };

  return movie.poster ? (
    <Poster
      sx={[
        posterStyles,
        {
          backgroundImage: `url(${movie.poster})`,
        },
        onClick && active,
        movie.locked && locked,
      ]}
      onClick={onClick}
    />
  ) : (
    <NoPoster sx={[posterStyles]} onClick={onClick}>
      <TheatresIcon fontSize="large" />
      <div>{movie.title}</div>
    </NoPoster>
  );
};

export default MoviePoster;
