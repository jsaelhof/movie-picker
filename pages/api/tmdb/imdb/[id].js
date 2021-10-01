import axios from "axios";

const handler = async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!id) {
    res.status(200).json("Id is required");
  }

  try {
    // Find the data by imdbid. This includes the TMDB id so we can look up the actual data.
    const { data: imdbData } = await axios.get(
      `${process.env.TMDB_API_URL}/find/${id}?language=en-US&external_source=imdb_id&api_key=${process.env.TMDB_API_KEY}`
    );

    // In general there should be only match but it seems possible to get more than one thing back.
    // If there's zero, then we can't find the TMDB data from the imdb id.
    if (imdbData.movie_results?.length < 1) {
      throw `No movies found with imdb id ${id}`;
    }

    // Look up the TMDB data using the movie id from the first request.
    const { data } = await axios.get(
      `${process.env.TMDB_API_URL}/movie/${imdbData.movie_results[0].id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,releases,certifications`
    );

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default handler;
