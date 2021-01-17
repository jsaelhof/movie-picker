import {remove, watch} from "../../db/db";

const handler = (req, res) => {
  try {
    let {body} = req;
    body.watched = new Date().toISOString();
    const watchedData = watch(body);

    const listData = remove(body._id);

    res.status(200).json({data: listData, watched: body});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

export default handler;
