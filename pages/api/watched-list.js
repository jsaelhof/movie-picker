import {queryWatched} from "../../db/db";

const handler = (req, res) => {
  res.status(200).json({data: queryWatched()});
};

export default handler;
