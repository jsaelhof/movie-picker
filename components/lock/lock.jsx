import clsx from "clsx";
import LockIcon from "@material-ui/icons/Lock";
import React, {useState} from "react";
import UnlockIcon from "mdi-material-ui/LockOpenVariant";

import styles from "./lock.module.css";

const Lock = ({locked, onToggleLock}) => {
  const [hovered, setHovered] = useState(false);

  const Icon = hovered && locked ? UnlockIcon : LockIcon;

  return (
    <div
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className={clsx(
        styles.lock,
        !locked && styles.active,
        locked && styles.locked,
      )}
    >
      <Icon
        className={styles.lockIcon}
        onClick={() => {
          onToggleLock(!locked);
        }}
      />
    </div>
  );
};

export default Lock;
