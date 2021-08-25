import styles from "./ratings.module.css";

import clsx from "clsx";

import { ratingsSourceImage } from "../../constants/ratings";

export const Ratings = ({ ratings, className, ...props }) => (
  <ul {...props} className={clsx(styles.ratings, className)}>
    {ratings.map(({ source, rating }) => (
      <li>
        <img
          src={`/images/ratings/${ratingsSourceImage[source]}`}
          className={styles.ratingsSourceIcon}
        />
        {rating}
      </li>
    ))}
  </ul>
);
