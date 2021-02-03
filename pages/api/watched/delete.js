import {errorDeleting} from "../../../errors/error_deleting";
import {tables} from "../../../constants/tables";
import {remove} from "../../../db/db";

const handler = (req, res) => {
  try {
    const {body} = req;

    if (!body.id) res.status(200).json(errorDeleting());

    const data = remove(tables.WATCHED, body.id);
    res.status(200).json({data, deleted: body});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

export default handler;
