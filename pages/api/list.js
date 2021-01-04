import {query} from "../../db/db";

const handler = (req, res) => {
  res.status(200).json({data: query()});
};

export default handler;
