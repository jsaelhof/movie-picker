import styles from "./logo.module.css";

import React from "react";
import Movie from "@material-ui/icons/Movie";

const Logo = () => (
  <div className={styles.title}>
    <Movie />
    <div>MD4K</div>
  </div>
);

export default Logo;
