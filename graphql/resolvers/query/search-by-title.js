import axios from "axios";

export const searchByTitle = async (parent, { title }) => {
  const { data } = await axios.get(
    `${process.env.OMDB_API_URL}?s=${title}&type=movie&apikey=${process.env.OMDB_API_KEY}`
  );

  return data.Response === "True"
    ? data.Search.map(({ Title, Year, imdbID, Poster }) => ({
        title: Title,
        year: Year,
        imdbID,
        poster: Poster && Poster !== "N/A" ? Poster : null,
      }))
    : [];
};
