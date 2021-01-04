import {remove} from "../../db/db";

const handler = (req, res) => {
  try {
    const {body} = req;

    if (!body.name) throw new Error("Name is required");

    const data = remove(body.name);
    res.status(200).json({data, deleted: body});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export default handler;
