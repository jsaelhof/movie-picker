import {Tooltip} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import TelevisionPlayIcon from "mdi-material-ui/TelevisionPlay";
import SearchIcon from "@material-ui/icons/Search";

import {sources} from "../../constants/sources";

import styles from "./view-action.module.css";

const ViewAction = ({title, source, className}) => {
  const searchUrl = {
    [sources.NONE]: `http://1337x.to/search/${encodeURI(title)}/1/`,
    [sources.NETFLIX]: `http://netflix.com/search?q=${encodeURI(title)}`, // FIXME: Doesn't like commas in the search...possibly other special chars. Other sites maybe the same?
    [sources.PRIME_VIDEO]: `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURI(
      title,
    )}&ie=UTF8`,
    [sources.PLEX]: `http://192.168.1.5:32400/web/index.html#!/search?query=${encodeURI(
      title,
    )}`,
    [sources.APPLE_TV]: "https://tv.apple.com/ca",
  }[source];

  const search = () => window.open(searchUrl, "movieView");

  return source === sources.NONE ? (
    <Tooltip title="Torrent">
      <SearchIcon className={className} onClick={search} />
    </Tooltip>
  ) : source === sources.DVD ? (
    <TelevisionPlayIcon
      className={clsx(className, source === sources.DVD && styles.disabled)}
    />
  ) : (
    <Tooltip title="View">
      <TelevisionPlayIcon className={className} onClick={search} />
    </Tooltip>
  );
};

export default ViewAction;
