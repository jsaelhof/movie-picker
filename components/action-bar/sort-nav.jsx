import clsx from "clsx";
import React from "react";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";

import { useResponsive } from "../../hooks/use-responsive";

import styles from "./sort-nav.module.css";

const SortNav = ({ selectedOption, options, onSort }) => {
  const { mobile } = useResponsive();

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
    <ul className={clsx(styles.sortNav, mobile && styles.centeredNav)}>
      {options.map(([label, key]) => (
        <li
          key={key}
          className={clsx(key === selectedOption[0] && styles.selected)}
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
        </li>
      ))}
    </ul>
  );
};

export default SortNav;
