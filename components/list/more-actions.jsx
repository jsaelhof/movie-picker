import { MenuItem, MenuList, Paper } from "@material-ui/core";
import CheckIcon from "mdi-material-ui/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import InformationIcon from "mdi-material-ui/InformationOutline";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TelevisionPlayIcon from "mdi-material-ui/TelevisionPlay";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

import {
  searchCommonSense,
  searchIMDB,
  searchIMDBTitle,
  searchStreaming,
  searchTMDB,
  searchTorrent,
} from "../../utils/search";
import { sources } from "../../constants/sources";

import styles from "./more-actions.module.css";

const MoreActions = ({ movie, onDeleteMovie, onClose }) => {
  const { source, title } = movie;

  const actions = [
    {
      value: 0,
      label: "Stream",
      Icon: TelevisionPlayIcon,
      action: () => {
        window.open(searchStreaming(title, source), "movieView");
      },
      remove: [sources.DVD, sources.NONE].includes(source),
    },
    {
      value: 2,
      label: "Common Sense Media",
      Icon: CheckIcon,
      action: () => window.open(searchCommonSense(title), "movieInfo"),
    },
    {
      value: 3,
      label: "IMDB",
      Icon: InformationIcon,
      action: () =>
        window.open(
          movie.imdb ? searchIMDB(movie.imdb) : searchIMDBTitle(title),
          "movieInfo"
        ),
    },
    {
      value: 4,
      label: "TMDB",
      Icon: InformationIcon,
      action: () => window.open(searchTMDB(title), "movieInfo"),
    },
    {
      value: 5,
      label: "Delete",
      Icon: DeleteIcon,
      action: onDeleteMovie,
    },
  ];

  return (
    <Paper>
      <div className={styles.closeButton} onClick={onClose}>
        <KeyboardArrowDown fontSize="small" />
      </div>
      <MenuList classes={{ root: styles.menu }} id="more-actions-menu">
        {actions.map(({ value, label, action, Icon, remove }) =>
          remove ? null : (
            <MenuItem
              key={value}
              onClick={() => {
                action(movie);
                onClose();
              }}
            >
              {Icon && <Icon className={styles.icon} />}
              {label}
            </MenuItem>
          )
        )}
      </MenuList>
    </Paper>
  );
};

export default MoreActions;
