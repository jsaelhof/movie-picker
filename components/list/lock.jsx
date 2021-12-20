import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import UnlockIcon from "@mitch528/mdi-material-ui/LockOpenVariant";

import { LockContainer, lockedStyles, StyledIcon } from "./lock.styles";

const Lock = ({ locked, onToggleLock }) => {
  const [hovered, setHovered] = useState(false);

  const Icon =
    (hovered && !locked) || (locked && !hovered) ? LockIcon : UnlockIcon;

  return (
    <LockContainer
      sx={[locked && lockedStyles]}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
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

export default Lock;
