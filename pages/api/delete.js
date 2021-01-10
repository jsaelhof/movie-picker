import {remove} from "../../db/db";

const handler = (req, res) => {
  try {
    const {body} = req;

    if (!body.id) throw new Error("Id is required");

    const data = remove(body.id);
    res.status(200).json({data, deleted: body});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

export default handler;
