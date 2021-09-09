import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import ActionButton from "../action-button/action-button";
import Lock from "../lock/lock";

import styles from "./detail-actions.module.css";

const DetailActions = ({
  movie,
  onEdit,
  onMarkWatched,
  onToggleLock,
  onMoreActions,
}) => (
  <div className={styles.detailActions}>
    <ActionButton Icon={EditIcon} tooltip="Edit" onClick={onEdit} />
    <ActionButton
      Icon={EyeCheckIcon}
      tooltip="Mark as Watched"
      onClick={onMarkWatched}
    />
    <Lock
      locked={movie.locked}
      onToggleLock={(locked) => {
        onToggleLock(locked);
      }}
    />
    <div /> {/* Spacer in the grid */}
    <ActionButton
      Icon={MoreHorizIcon}
      tooltip="More Actions"
      onClick={onMoreActions}
    />
  </div>
);

export default DetailActions;
