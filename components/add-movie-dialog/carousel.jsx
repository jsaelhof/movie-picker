import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import { useMediaQuery } from "@mui/material";
import { cond, constant, stubTrue } from "lodash";

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
      {cond([
        [constant(!movies && !searching), constant(null)],
        [
          constant(searching),
          constant(<StatusMessage>Searching...</StatusMessage>),
        ],
        [
          constant(movies?.length === 0),
          constant(<StatusMessage>No Movies Found</StatusMessage>),
        ],
        [
          stubTrue,
          constant(
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
          ),
        ],
      ])()}
    </div>
  );
};

export default Carousel;
