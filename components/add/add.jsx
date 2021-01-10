import {Button, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useState} from "react";
import map from "lodash/map";
import {sourceLabels, sourceLogos, sources} from "../../constants/sources";

import styles from "./add.module.css";

const Add = ({add}) => {
  const [title, setTitle] = useState();
  const [runtime, setRuntime] = useState();
  const [genre, setGenre] = useState();
  const [source, setSource] = useState();

  return (
    <div className={styles.main}>
      <div className={styles.addForm}>
        <TextField
          required
          id="title"
          label="Title"
          variant="outlined"
          placeholder="Title"
          onChange={({target}) => setTitle(target.value)}
        />
        <TextField
          id="runtime"
          label="Runtime"
          variant="outlined"
          placeholder="0:00"
          inputProps={{
            maxlength: 4,
          }}
          onChange={({target}) => {
            const [hours, minutes] = target.value.includes(":")
              ? target.value.split(":")
              : [0, target.value];
            setRuntime(
              (hours ? hours * 3600 : 0) + (minutes ? minutes * 60 : 0),
            );
          }}
        />
        <TextField
          id="genre"
          label="Genre"
          variant="outlined"
          placeholder="Drama"
          onChange={({target}) => setGenre(target.value)}
        />

        <Select
          id="source"
          variant="outlined"
          value={source || 0}
          onChange={({target}) => setSource(target.value)}
          className={styles.sourceMenu}
        >
          {map(sources, (sourceValue) => (
            <MenuItem key={sourceValue} value={sourceValue}>
              <div className={styles.sourceMenuItem}>
                {sourceValue > 0 && (
                  <img src={sourceLogos[sourceValue]} width="30" height="30" />
                )}
                <span>{sourceLabels[sourceValue]}</span>
              </div>
            </MenuItem>
          ))}
        </Select>
      </div>

      <Button
        variant="outlined"
        onClick={() =>
          add({
            title,
            runtime,
            genre,
            source,
          })
        }
      >
        Add Movie
      </Button>
    </div>
  );
};

export default Add;
