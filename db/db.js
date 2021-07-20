import fs from "fs";
import map from "lodash/map";
import random from "lodash/random";

export const load = () => JSON.parse(fs.readFileSync(`db/db.json`));

const id = () => random(100000000, 999999999).toString();

const read = (db, table) =>
  JSON.parse(fs.readFileSync(`db/${db}/${table}.json`));

const update = (db, table, updatedData) => {
  fs.writeFileSync(
    `db/${db}/${table}.json`,
    JSON.stringify(updatedData, null, 2)
  );
  return query(db, table);
};

export const query = (db, table) => map(read(db, table), (data) => data);

export const find = (db, table, key, value) =>
  query(db, table).find((movie) => movie[key] === value);

export const upsert = (db, table, updateData) => {
  // Find record or make a new one
  const record = find(db, table, "_id", updateData._id) || {
    _id: updateData._id || id(), // When undoing, or moving a movie to the watched list, it already has an id but doesn't update because it's not in that table. Use it's id instead of making one.
    addedOn: new Date().toISOString(),
  };

  // Add the new data to the record
  const updatedRecord = {
    ...record,
    ...updateData,
    editedOn: new Date().toISOString(),
  };

  // Add the updated record to the DB
  update(db, table, {
    ...read(db, table),
    [record._id]: updatedRecord,
  });

  // Return the updated record
  return updatedRecord;
};

export const remove = (db, table, movieId) => {
  // TODO: Check and see if the movie with this id even exists and provide an error if it doesn't.
  const updatedData = read(db, table);
  delete updatedData[movieId];
  update(db, table, updatedData);
  return {
    _id: movieId,
  };
};

export const db = {
  load,
  query,
  find,
  upsert,
  remove,
};
