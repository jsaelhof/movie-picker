import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import { useMediaQuery, styled } from "@mui/material";
import Slider from "react-slick";

import MoviePoster from "./movie-poster";

const Carousel = ({ movies, searching, onSelectMovie }) => {
  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  if (!movies && !searching) {
    return null;
  }

  if (searching) return <StatusMessage>Searching...</StatusMessage>;

  if (movies.length === 0)
    return <StatusMessage>No Movies Found</StatusMessage>;

  return (
    <StyledSlider
      arrows
      dots
      infinite={false}
      speed={500}
      slidesToShow={4}
      slidesToScroll={4}
      responsive={[
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ]}
    >
      {movies.map(({ poster, title, year, imdbID }, index) => (
        <MoviePoster
          key={imdbID}
          poster={poster}
          title={title}
          year={year}
          height={xsmall ? 110 : undefined}
          onClick={() => {
            onSelectMovie(index);
          }}
        />
      ))}
    </StyledSlider>
  );
};

const StatusMessage = styled("div")`
  height: 280px;
  text-align: center;
`;

const StyledSlider = styled(Slider)(({ theme: { palette, spacing } }) => ({
  margin: `0 30px ${spacing(4)}`,

  "& > button:before": {
    color: palette.grey[800],
  },
}));

export default Carousel;
