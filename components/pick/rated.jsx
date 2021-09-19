import styles from "./rated.module.css";

import { isNil } from "lodash";
import React from "react";

const Rated = ({ rated }) => {
  return (
    <div className={styles.rated}>
      {rated === "N/A" || isNil(rated) ? "?" : rated}
    </div>
  );
};

export default Rated;
