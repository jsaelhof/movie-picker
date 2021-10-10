import styles from "./logo.module.css";

import React from "react";

const Logo = ({ small }) => (
  <div className={styles.logo}>
    <img src={small ? "/images/logo-small.png" : "/images/logo.png"} />
  </div>
);

export default Logo;
