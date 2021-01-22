import {Tooltip} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import TelevisionPlayIcon from "mdi-material-ui/TelevisionPlay";
import SearchIcon from "@material-ui/icons/Search";

import {sources} from "../../constants/sources";
import ActionButton from "../action-button/action-button";

const ViewAction = ({movie}) => {
  const {title, source} = movie;

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
    <ActionButton Icon={SearchIcon} tooltip="Torrent" onClick={search} />
  ) : source === sources.DVD ? (
    <ActionButton Icon={TelevisionPlayIcon} disabled />
  ) : (
    <ActionButton Icon={TelevisionPlayIcon} tooltip="View" onClick={search} />
  );
};

export default ViewAction;
