import React from "react";
import { styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EyeCheckIcon from "@mitch528/mdi-material-ui/EyeCheck";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import ActionButton from "../action-button/action-button";
import Lock from "./lock";

const DetailActions = ({
  movie,
  onEdit,
  onMarkWatched,
  onToggleLock,
  onMoreActions,
}) => (
  <Actions>
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
  </Actions>
);

const Actions = styled("div")`
  display: grid;
  grid-template-columns: 26px 26px 26px 1fr 26px;
  gap: ${({ theme: { spacing } }) => spacing(1)};
`;

export default DetailActions;
