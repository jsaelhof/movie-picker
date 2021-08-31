import styles from "./carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import { useMediaQuery } from "@material-ui/core";
import Slider from "react-slick";

import MoviePoster from "./movie-poster";

const Carousel = ({ movies, searching, onSelectMovie }) => {
  const xsmall = useMediaQuery("(max-width: 600px), (max-height: 414px)");

  return !movies || movies.length === 0 || searching ? (
    <div className={styles.statusMessage}>
      {searching
        ? "Searching..."
        : movies?.length === 0
        ? "No Movies Found"
        : null}
    </div>
  ) : (
    <Slider
      arrows
      dots
      infinite={false}
      speed={500}
      slidesToShow={4}
      slidesToScroll={4}
      className={styles.slider}
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
      {movies.map(({ Poster, Title, Year, imdbID }, index) => (
        <MoviePoster
          key={imdbID}
          poster={Poster}
          title={Title}
          year={Year}
          height={xsmall ? 110 : undefined}
          onClick={() => {
            onSelectMovie(index);
          }}
        />
      ))}
    </Slider>
  );
};

export default Carousel;
