import React from "react";
import DeleteIcon from "@mitch528/mdi-material-ui/MovieRemove";
import EditIcon from "@mui/icons-material/Edit";
import EyeCheckIcon from "@mitch528/mdi-material-ui/EyeCheck";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mitch528/mdi-material-ui/LockOpenVariant";

import { Actions } from "./detail-actions.styles";
import ActionButton from "../action-button/action-button";

const DetailActions = ({
  movie,
  onEdit,
  onMarkWatched,
  onToggleLock,
  onDelete,
}) => (
  <Actions>
    <ActionButton Icon={EditIcon} tooltip="Edit" onClick={onEdit} />
    <ActionButton
      Icon={EyeCheckIcon}
      tooltip="Mark as Watched"
      onClick={onMarkWatched}
    />
    {movie.locked ? (
      <ActionButton
        Icon={UnlockIcon}
        tooltip="Unlock"
        onClick={() => onToggleLock(false)}
      />
    ) : (
      <ActionButton
        Icon={LockIcon}
        tooltip="Lock"
        onClick={() => onToggleLock(true)}
      />
    )}
    <ActionButton Icon={DeleteIcon} tooltip="Delete" onClick={onDelete} />
  </Actions>
);

export default DetailActions;
