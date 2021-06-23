import filter from "lodash/filter";
import isNil from "lodash/isNil";
import conforms from "lodash/conforms";
import sample from "lodash/sample";
import size from "lodash/size";
import { errorCodes } from "../constants/error_codes";

export const randomPick = (movies, options = {}) => {
  const filters = {
    locked: (locked) => !locked,
  };

  if (!isNil(options.minRuntime) || !isNil(options.maxRuntime)) {
    filters.runtime = (runtime) =>
      runtime >= (options.minRuntime || 0) &&
      runtime <= (options.maxRuntime || Infinity);
  }

  const list = filter(movies, conforms(filters));

  if (size(list) === 0) {
    throw new Error(errorCodes.PICKING);
  } else {
    return sample(list);
  }
};
