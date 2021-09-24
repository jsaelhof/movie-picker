import axios from "axios";

const handler = async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!id) {
    res.status(200).json("Id is required");
  }

  try {
    const { data } = await axios.get(
      `${process.env.TMDB_API_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default handler;
