import styles from "./page-container.module.css";

import React from "react";
import clsx from "clsx";
import { useResponsive } from "../../hooks/use-responsive";

const PageContainer = ({ children }) => {
  const { mobile } = useResponsive();
  return (
    <div className={clsx(styles.container, mobile && styles.container)}>
      {children}
    </div>
  );
};

export default PageContainer;
