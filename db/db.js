import fs from "fs";
import map from "lodash/map";
import random from "lodash/random";

const id = () => random(100000000, 999999999).toString();

const update = (updatedData) => {
  fs.writeFileSync("db/data.json", JSON.stringify(updatedData));
  return query();
};

const read = () => JSON.parse(fs.readFileSync("db/data.json"));

export const query = () => map(read(), (data) => data);

export const find = (key, value) =>
  query().find((movie) => movie[key] === value);

export const upsert = (updateData) => {
  const record = find("title", updateData.title) || {_id: id()};

  return update({
    ...read(),
    [record._id]: {
      ...record,
      ...updateData,
    },
  });
};

export const remove = (movieId) => {
  // TODO: Check and see if the movie with this id even exists and provide an error if it doesn't.
  const updatedData = read();
  delete updatedData[movieId];
  return update(updatedData);
};
