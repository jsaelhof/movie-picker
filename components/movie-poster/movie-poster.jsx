import React from "react";
import { styled } from "@mui/material";
import TheatresIcon from "@mui/icons-material/Theaters";

import { toTransientProps } from "../../utils/to-transient-props";

const MoviePoster = ({ movie, height = 250, onClick }) => {
  const posterProps = toTransientProps({
    height,
    locked: movie.locked,
    backgroundImage: `url(${movie.poster})`,
  });

  return movie.poster ? (
    <Poster onClick={onClick} {...posterProps} />
  ) : (
    <NoPoster onClick={onClick} {...posterProps}>
      <TheatresIcon fontSize="large" />
      <div>{movie.title}</div>
    </NoPoster>
  );
};

const Poster = styled("div")`
  background-color: white;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  border-radius: 4px;
  background-image: ${({ $backgroundImage }) => $backgroundImage};
  opacity: ${({ $locked }) => ($locked ? 0.3 : 1)};

  ${({ $height }) => ({
    width: $height * 0.64,
    height: $height,
  })};

  ${({ onClick }) =>
    !!onClick && {
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.025)",
      },
    }};
`;

const NoPoster = styled(Poster)`
  display: grid;
  grid-template-rows: 1fr 100px;
  justify-items: center;
  align-items: center;
  text-align: center;
  color: ${({ theme: { palette } }) => palette.grey[800]};
  font-size: 0.9rem;
  background: #f7f7fc;
`;

export default MoviePoster;
