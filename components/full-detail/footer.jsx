import React from "react";

import {
  searchCommonSense,
  searchIMDB,
  searchIMDBTitle,
  searchTMDB,
} from "../../utils/search";
import { ActionImage, Container } from "./footer.styles";

const Footer = ({ movie }) => {
  const { title } = movie;

  const actions = [
    {
      label: "TMDB",
      src: "/images/third_party/tmdb.png",
      action: () => window.open(searchTMDB(title), "movieInfo"),
    },
    {
      label: "IMDB",
      src: "/images/third_party/imdb.png",
      action: () =>
        window.open(
          movie.imdbID ? searchIMDB(movie.imdbID) : searchIMDBTitle(title),
          "movieInfo"
        ),
    },
    {
      label: "Common Sense Media",
      src: "/images/third_party/commonsense.png",
      action: () => window.open(searchCommonSense(title), "movieInfo"),
    },
  ];

  return (
    <Container>
      {actions.map(({ label, src, action }) => (
        <ActionImage
          key={label}
          alt={label}
          src={src}
          onClick={() => {
            action(movie);
          }}
        />
      ))}
    </Container>
  );
};

export default Footer;
