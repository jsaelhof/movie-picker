import reduce from "lodash/reduce";
import sample from "lodash/sample";
import size from "lodash/size";

import {query} from "../../db/db";

const handler = (req, res) => {
  const {body} = req;

  let list = reduce(
    query(),
    (acc, movie) => {
      // TODO: Look for conditions and add a function to an array.
      // All conditions must pass to add the movie.
      // (maybe group min/max runtime as one option instead of two).
      if (
        size(body) === 0 ||
        (movie?.runtime >= body?.minRuntime &&
          movie?.runtime <= body?.maxRuntime)
      ) {
        acc[movie._id] = movie;
      }

      return acc;
    },
    {},
  );

  res.status(200).json(size(list) > 0 ? sample(list) : null);
};

export default handler;
