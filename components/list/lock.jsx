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

const LockContainer = styled("div")`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $locked }) => ($locked ? 1 : 0.25)};

  &:hover {
    opacity: 1;
  }

  & :hover {
    color: ${({ theme: { palette } }) => palette.accent};
  }
`;

const StyledIcon = styled("div")`
  font-size: 1.25rem;
  color: ${({ theme: { palette } }) => palette.grey[600]};
`;

export default Lock;
