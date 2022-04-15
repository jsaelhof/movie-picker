import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import { useMediaQuery } from "@mui/material";

import MoviePoster from "./movie-poster";
import { StatusMessage, Slider } from "./carousel.styles";

const Carousel = ({ movies, searching, onSelectMovie }) => {
  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  return (
    <div
      style={{
        height: xsmall ? 190 : 280,
      }}
    >
      <ConditionalRender cond={!movies && !searching} message="">
        <ConditionalRender cond={searching} message="Searching...">
          <ConditionalRender
            cond={movies?.length === 0}
            message="No Movies Found"
          >
            <Slider
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
              {movies?.map(({ poster, title, year, imdbID }, index) => (
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
            </Slider>
          </ConditionalRender>
        </ConditionalRender>
      </ConditionalRender>
    </div>
  );
};

const ConditionalRender = ({ cond, message, children }) =>
  cond ? <StatusMessage>{message}</StatusMessage> : children;

export default Carousel;
