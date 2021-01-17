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
  const record = find("_id", updateData._id) || {
    _id: id(),
    addedOn: new Date().toISOString(), // TODO: Move this to the endpoint
  };

  return update({
    ...read(),
    [record._id]: {
      ...record,
      ...updateData,
      editedOn: new Date().toISOString(), // TODO: Movie this to the endpoint (make an edit endpoint)
    },
  });
};

export const remove = (movieId) => {
  // TODO: Check and see if the movie with this id even exists and provide an error if it doesn't.
  const updatedData = read();
  delete updatedData[movieId];
  return update(updatedData);
};

const readWatched = () => JSON.parse(fs.readFileSync("db/watched.json"));

export const queryWatched = () => map(readWatched(), (data) => data);

// This reaally should be brought together with upsert etc...there should be basic CRUD commands that take a table (data or watched file) and operate on it the same way.
export const watch = (updateData) => {
  const updatedData = JSON.stringify({
    ...readWatched(),
    [updateData._id]: updateData,
  });
  fs.writeFileSync("db/watched.json", updatedData);
  return updatedData;
};
