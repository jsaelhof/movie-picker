import React from "react";
import SearchIcon from "@material-ui/icons/Search";

import {sourceLogos, sources} from "../../constants/sources";
import ListCell from "../list-cell/list-cell";

import styles from "./source-cell.module.css";

const SourceCell = ({movie}) => {
  const img = <img src={sourceLogos[movie.source]} width="40" height="40" />;

  const search = {
    [sources.NONE]: `http://1337x.to/search/${encodeURI(movie.title)}/1/`,
    [sources.NETFLIX]: `http://netflix.com/search?q=${encodeURI(movie.title)}`, // FIXME: Doesn't like commas in the search...possibly other special chars. Other sites maybe the same?
    [sources.PRIME_VIDEO]: `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURI(
      movie.title,
    )}&ie=UTF8`,
    [sources.PLEX]: `http://192.168.1.5:32400/web/index.html#!/search?query=${encodeURI(
      movie.title,
    )}`,
    [sources.APPLE_TV]: "https://tv.apple.com/ca",
  }[movie.source];

  return (
    <ListCell>
      {search ? (
        <a target="_blank" href={search}>
          <div className={styles.sourceImageWrapper}>
            {img}
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
          </div>
        </a>
      ) : (
        img
      )}
    </ListCell>
  );
};

export default SourceCell;
