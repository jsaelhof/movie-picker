import {tables} from "../../../../constants/tables";
import {remove, upsert} from "../../../../db/db";

const handler = (req, res) => {
  const {
    query: {db},
  } = req;

  try {
    let {body} = req;
    body.watched = new Date().toISOString();
    const watchedData = upsert(db, tables.WATCHED, body);

    const listData = remove(db, tables.MOVIES, body._id);

    res.status(200).json({data: listData, watched: body});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

export default handler;
