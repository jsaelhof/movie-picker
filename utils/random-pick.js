import { filter, conforms, sample, size } from "lodash";
import { errorCodes } from "../constants/error_codes";

export const randomPick = (movies, options = {}) => {
  const filters = {
    locked: (locked) => !locked,
  };

  if (!options.minRuntime || !options.maxRuntime) {
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
