import axios from "axios";

export const omdbSearch = async (searchInput) => {
  const {data} = await axios.get(
    `${process.env.OMDB_API_URL}?s=${searchInput}&type=movie&apikey=${process.env.OMDB_API_KEY}`,
  );
  return data;
};

export const omdbTitle = async (title) => {
  const {data} = await axios.get(
    `${process.env.OMDB_API_URL}?t=${title}&apikey=${process.env.OMDB_API_KEY}`,
  );
  return data;
};
