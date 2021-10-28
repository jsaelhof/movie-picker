import { MenuItem, MenuList, Paper, styled } from "@mui/material";
import CheckIcon from "@mitch528/mdi-material-ui/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import InformationIcon from "@mitch528/mdi-material-ui/InformationOutline";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TelevisionPlayIcon from "@mitch528/mdi-material-ui/TelevisionPlay";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import {
  searchCommonSense,
  searchIMDB,
  searchIMDBTitle,
  searchStreaming,
  searchTMDB,
  searchTorrent,
} from "../../utils/search";
import { sources } from "../../constants/sources";

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
      <CloseButton onClick={onClose}>
        <KeyboardArrowDown fontSize="small" />
      </CloseButton>
      <Menu id="more-actions-menu">
        {actions.map(({ value, label, action, Icon, remove }) =>
          remove ? null : (
            <MenuItem
              key={value}
              onClick={() => {
                action(movie);
                onClose();
              }}
            >
              {Icon && <StyledIcon as={Icon} />}
              {label}
            </MenuItem>
          )
        )}
      </Menu>
    </Paper>
  );
};

const CloseButton = styled("div")`
  color: ${({ theme: { palette } }) => palette.grey[700]};
  display: flex;
  justify-content: center;
  padding-top: ${({ theme: { spacing } }) => spacing(1)};
  cursor: pointer;
`;

const Menu = styled(MenuList)`
  padding: 0;
  padding-bottom: ${({ theme: { spacing } }) => spacing(1)};
`;

const StyledIcon = styled("div")`
  margin-right: ${({ theme: { spacing } }) => spacing(1)};
`;

export default MoreActions;
