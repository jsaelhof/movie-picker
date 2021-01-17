import {tables} from "../../../constants/tables";
import {query} from "../../../db/db";

const handler = (req, res) => {
  res.status(200).json({data: query(tables.WATCHED)});
};

export default handler;
