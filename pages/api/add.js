import isNil from "lodash/isNil";
import values from "lodash/values";

import {upsert} from "../../db/db";
import {sources} from "../../constants/sources";

const handler = (req, res) => {
  try {
    const {body} = req;

    if (!body.name) throw new Error("Name is required");
    if (!isNil(body.source) && !values(sources).includes(body.source))
      throw new Error("Source is invalid");

    const data = upsert(body);
    res.status(200).json({data, added: body});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

export default handler;
