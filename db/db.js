import fs from "fs";
import {isSameName} from "../utils/is-same-name";

const update = (updatedData) => {
  fs.writeFileSync("db/data.json", JSON.stringify(updatedData));
  return query();
};

export const query = () => JSON.parse(fs.readFileSync("db/data.json"));

export const find = (name) =>
  query().find((movie) => isSameName(movie.name, name));

export const upsert = (updateData) => {
  const existingRecord = find(updateData.name);
  const data = query();

  return update(
    existingRecord
      ? [
          ...data.filter((movie) => !isSameName(movie.name, updateData.name)),
          {
            ...existingRecord,
            ...updateData,
          },
        ]
      : [...data, updateData],
  );
};

export const remove = (name) => {
  const updatedData = [
    ...query().filter((movie) => !isSameName(movie.name, name)),
  ];

  return update(updatedData);
};
