import sample from "lodash/sample";

import {query} from "../../db/db";

const handler = (req, res) => {
  res.status(200).json(sample(query()));
};

export default handler;
