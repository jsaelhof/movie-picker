import React from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import {
  SortNavList,
  SortNavListItem,
  sortNavSelectedItem,
  sortOrderIcon,
} from "./sort-nav.styles";
import { useAppContext } from "../../context/app-context";

const options = [
  ["Added", "addedOn"],
  ["Title", "title"],
  ["Runtime", "runtime"],
];

const SortNav = () => {
  const { order, setOrder } = useAppContext();

  const SortOrderIcon =
    order[0] === "addedOn"
      ? order[1] === "asc"
        ? KeyboardArrowUp
        : KeyboardArrowDown
      : order[1] === "asc"
      ? KeyboardArrowDown
      : KeyboardArrowUp;

  const resolveOrder = (key) => [
    key,
    key !== order[0]
      ? key === "addedOn"
        ? "desc"
        : "asc"
      : order[1] === "asc"
      ? "desc"
      : "asc",
  ];

  return (
    <SortNavList>
      {options.map(([label, key]) => (
        <SortNavListItem
          key={key}
          data-active={key === order[0]}
          data-sort={key === order[0] && order[1]}
          sx={[key === order[0] && sortNavSelectedItem]}
          onClick={() => {
            setOrder(resolveOrder(key));
          }}
        >
          {label}
          {key === order[0] && (
            <SortOrderIcon fontSize="small" style={sortOrderIcon} />
          )}
        </SortNavListItem>
      ))}
    </SortNavList>
  );
};

export default SortNav;
