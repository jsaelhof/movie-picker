import axios from "axios";

const handler = async (req, res) => {
  const {
    query: {title},
  } = req;

  if (!title) {
    res.status(200).json("Title is rquired");
  }

  try {
    const {data} = await axios.get(
      `${process.env.OMDB_API_URL}?s=${title}&type=movie&apikey=${process.env.OMDB_API_KEY}`,
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default handler;
