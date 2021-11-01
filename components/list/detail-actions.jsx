import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import EyeCheckIcon from "@mitch528/mdi-material-ui/EyeCheck";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
