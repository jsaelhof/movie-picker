export const cacheFilter = (cacheList, id) =>
  cacheList.filter(({ __ref }) => __ref !== `Movie:${id}`);

export const cacheInsert = (cacheList, id) =>
  cacheList.concat({ __ref: `Movie:${id}` });
