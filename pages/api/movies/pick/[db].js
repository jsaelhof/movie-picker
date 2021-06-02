import conforms from "lodash/conforms";
import filter from "lodash/filter";
import isNil from "lodash/isNil";
import sample from "lodash/sample";
import size from "lodash/size";

import {errorPicking} from "../../../../errors/error_picking";
import {tables} from "../../../../constants/tables";
import {query} from "../../../../db/db";

const handler = (req, res) => {
  const {
    body,
    query: {db},
  } = req;

  const filters = {
    locked: (locked) => !locked,
  };

  if (!isNil(body.minRuntime) || !isNil(body.maxRuntime)) {
    filters.runtime = (runtime) =>
      runtime >= (body.minRuntime || 0) &&
      runtime <= (body.maxRuntime || Infinity);
  }

  const list = filter(query(db, tables.MOVIES), conforms(filters));

  if (size(list) === 0) {
    res.status(200).json(errorPicking());
  } else {
    res.status(200).json(sample(list));
  }
};

export default handler;
