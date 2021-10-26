import { styled } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import React, { useState } from "react";
import UnlockIcon from "@mitch528/mdi-material-ui/LockOpenVariant";

const Lock = ({ locked, onToggleLock }) => {
  const [hovered, setHovered] = useState(false);

  const Icon =
    (hovered && !locked) || (locked && !hovered) ? LockIcon : UnlockIcon;

  return (
    <LockContainer
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      $locked={locked}
    >
      <StyledIcon
        as={Icon}
        onClick={() => {
          onToggleLock(!locked);
        }}
      />
    </LockContainer>
  );
};

const LockContainer = styled("div")(({ theme: { palette }, $locked }) => ({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: $locked ? 1 : 0.25,

  ":hover": {
    opacity: 1,
  },

  "& :hover": {
    color: palette.accent,
  },
}));

const StyledIcon = styled("div")(({ theme: { palette } }) => ({
  fontSize: "1.25rem",
  color: palette.grey[600],
}));

export default Lock;
