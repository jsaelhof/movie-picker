import React from "react";
import TheatresIcon from "@mui/icons-material/Theaters";

import { active, Lock, locked, NoPoster, Poster } from "./movie-poster.styles";

const MoviePoster = ({ movie, height = 250, onClick, noLock = false }) => {
  const posterStyles = {
    width: height * 0.64,
    height,
  };

  return (
    <div style={{ position: "relative" }}>
      {movie.poster ? (
        <Poster
          sx={[
            posterStyles,
            {
              backgroundImage: `url(${movie.poster})`,
            },
            onClick && active,
            movie.locked && !noLock && locked,
          ]}
          onClick={onClick}
        />
      ) : (
        <NoPoster sx={[posterStyles]} onClick={onClick}>
          <TheatresIcon fontSize="large" />
          <div>{movie.title}</div>
        </NoPoster>
      )}
      {movie.locked && !noLock && <Lock />}
    </div>
  );
};

export default MoviePoster;
