export const api = Object.freeze({
  LOAD_DB: "/api/db/load",
  MOVIES: "/api/movies/list/%db%",
  ADD_MOVIE: "/api/movies/add/%db%",
  PICK_MOVIE: "/api/movies/pick/%db%",
  DELETE_MOVIE: "/api/movies/delete/%db%",
  WATCHED_MOVIES: "/api/watched/list/%db%",
  DELETE_WATCHED: "/api/watched/delete/%db%",
  MARK_WATCHED: "/api/watched/watched/%db%",
  OMDB_SEARCH: "/api/omdb/search/%title%",
  OMDB_TITLE: "/api/omdb/title/%title%",
});
