import {ClickAwayListener, MenuItem, MenuList, Paper} from "@material-ui/core";
import CheckIcon from "mdi-material-ui/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import InformationIcon from "mdi-material-ui/InformationOutline";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import TelevisionPlayIcon from "mdi-material-ui/TelevisionPlay";

import {
  searchCommonSense,
  searchIMDB,
  searchIMDBTitle,
  searchStreaming,
  searchTMDB,
  searchTorrent,
} from "../../utils/search";
import {sources} from "../../constants/sources";
import ActionButton from "../action-button/action-button";

import styles from "./more-action.module.css";

const MoreAction = ({movie, onDeleteMovie}) => {
  const {source, title} = movie;
  const [open, setOpen] = useState(false);

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
      value: 1,
      label: "Find Torrent",
      Icon: SearchIcon,
      action: () => {
        window.open(searchTorrent(title), "movieView");
      },
      remove: source !== sources.NONE,
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
          "movieInfo",
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
    <div className={styles.container}>
      <ActionButton
        Icon={MoreHorizIcon}
        tooltip="More Actions"
        onClick={() => {
          setOpen(true);
        }}
      />

      {open && (
        <Paper className={styles.menu}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <MenuList id="more-actions-menu">
              {actions.map(({value, label, action, Icon, remove}) =>
                remove ? null : (
                  <MenuItem
                    key={value}
                    onClick={() => {
                      setOpen(false);
                      action(movie);
                    }}
                  >
                    {Icon && <Icon className={styles.icon} />}
                    {label}
                  </MenuItem>
                ),
              )}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      )}
    </div>
  );
};

export default MoreAction;
