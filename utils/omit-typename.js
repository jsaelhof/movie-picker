import omit from "lodash/omit";

export const omitTypename = (o) => omit(o, "__typename");
