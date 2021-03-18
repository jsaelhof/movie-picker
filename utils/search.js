import {sources} from "../constants/sources";

export const searchIMDB = (imdbId) => `https://www.imdb.com/title/${imdbId}`;

export const searchIMDBTitle = (title) =>
  `https://www.imdb.com/find?q=${encodeURIComponent(title)}`;

export const searchTMDB = (title) =>
  `https://www.themoviedb.org/search?query=${title.replace(" ", "+")}`;

export const searchCommonSense = (title) =>
  `https://www.commonsensemedia.org/movie-reviews/${title}`;

export const searchTorrent = (title) => `http://1337x.to/search/${title}/1/`;

export const searchStreaming = (title, source) =>
  ({
    [sources.NETFLIX]: `http://netflix.com/search?q=%s`, // FIXME: Doesn't like commas in the search...possibly other special chars. Other sites maybe the same?
    [sources.PRIME_VIDEO]: `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=%s&ie=UTF8`,
    [sources.PLEX]: `http://192.168.1.5:32400/web/index.html#!/search?query=%s`,
    [sources.APPLE_TV]: "https://tv.apple.com/ca",
    [sources.DISNEY_PLUS]: "https://disneyplus.com",
  }[source].replace("%s", encodeURI(title)));
