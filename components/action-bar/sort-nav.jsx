import { styled } from "@mui/material";
import React from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";

const SortNav = ({ selectedOption, options, onSort }) => {
  const SortOrderIcon =
    selectedOption[0] === "addedOn"
      ? selectedOption[1] === "asc"
        ? KeyboardArrowUp
        : KeyboardArrowDown
      : selectedOption[1] === "asc"
      ? KeyboardArrowDown
      : KeyboardArrowUp;

  const resolveOrder = (key) => [
    key,
    key !== selectedOption[0]
      ? "asc"
      : selectedOption[1] === "asc"
      ? "desc"
      : "asc",
  ];

  return (
    <SortNavList>
      {options.map(([label, key]) => (
        <SortNavListItem
          key={key}
          $selected={key === selectedOption[0]}
          onClick={() => {
            const newOrder = resolveOrder(key);
            onSort(newOrder[0], newOrder[1]);
          }}
        >
          {label}
          {key === selectedOption[0] && (
            <SortOrderIcon
              fontSize="small"
              style={{
                verticalAlign: "middle",
                paddingBottom: 2,
                marginLeft: 4,
              }}
            />
          )}
        </SortNavListItem>
      ))}
    </SortNavList>
  );
};

const SortNavList = styled("ul")(({ theme: { breakpoints, spacing } }) => ({
  flexGrow: 1,
  display: "flex",
  padding: 0,
  alignItems: "baseline",
  justifyContent: "flex-start",

  [breakpoints.down(575)]: {
    justifyContent: "center",
    marginTop: spacing(4),
    marginBottom: 0,
  },
}));

const SortNavListItem = styled("li")(
  ({ theme: { palette, spacing }, $selected }) => ({
    listStyleType: "none",
    marginLeft: spacing(2),
    fontSize: "0.8rem",
    cursor: "pointer",
    color: palette.grey[700],
    paddingBottom: spacing(0.5),

    ...($selected && {
      fontSize: "1rem",
      color: "initial",
      borderBottom: `1px solid ${palette.blueAccent}`,
    }),
  })
);

export default SortNav;
