import { tables } from "../../../../constants/tables";
import { query } from "../../../../db/db";

const handler = (req, res) => {
  const {
    query: { db },
  } = req;

  res.status(200).json(query(db, tables.MOVIES));
};

export default handler;
