import React from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import {
  SortNavList,
  SortNavListItem,
  sortNavSelectedItem,
} from "./sort-nav.styles";

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
          sx={[key === selectedOption[0] && sortNavSelectedItem]}
          onClick={() => {
            onSort(...resolveOrder(key));
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

export default SortNav;
