import {load} from "../../../db/db";

const handler = (req, res) => {
  res.status(200).json(load());
};

export default handler;
