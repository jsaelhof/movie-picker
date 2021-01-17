import fs from "fs";
import map from "lodash/map";
import random from "lodash/random";

const id = () => random(100000000, 999999999).toString();

const read = (table) => JSON.parse(fs.readFileSync(`db/${table}.json`));

const update = (table, updatedData) => {
  fs.writeFileSync(`db/${table}.json`, JSON.stringify(updatedData));
  return query(table);
};

export const query = (table) => map(read(table), (data) => data);

export const find = (table, key, value) =>
  query(table).find((movie) => movie[key] === value);

export const upsert = (table, updateData) => {
  const record = find(table, "_id", updateData._id) || {
    _id: id(),
    addedOn: new Date().toISOString(),
  };

  return update(table, {
    ...read(table),
    [record._id]: {
      ...record,
      ...updateData,
      editedOn: new Date().toISOString(),
    },
  });
};

export const remove = (table, movieId) => {
  // TODO: Check and see if the movie with this id even exists and provide an error if it doesn't.
  const updatedData = read(table);
  delete updatedData[movieId];
  return update(table, updatedData);
};
