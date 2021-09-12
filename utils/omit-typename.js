import omitDeep from "omit-deep-lodash";

export const omitTypename = (o) => omitDeep(o, "__typename");
