import isNil from "lodash/isNil";
import values from "lodash/values";

import {upsert} from "../../../db/db";
import {sources} from "../../../constants/sources";
import {tables} from "../../../constants/tables";

const handler = (req, res) => {
  try {
    const {body} = req;

    if (!body.title) throw new Error("Title is required");

    if (isNil(body.source)) body.source = sources.NONE;
    if (isNil(body.locked)) body.locked = false;

    const data = upsert(tables.MOVIES, body);
    res.status(200).json({data, added: body});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

export default handler;
