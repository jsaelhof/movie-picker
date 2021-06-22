import List from "../list/list";

import styles from "./pick.module.css";

const Pick = ({ movie }) => {
  return (
    <div className={styles.pick}>
      <div className={styles.title}>You're watching:</div>
      <List movies={[movie]} hideHeader />
    </div>
  );
};

export default Pick;
