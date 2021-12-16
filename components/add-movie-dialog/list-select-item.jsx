import styles from "./list-select-item.module.css";
import clsx from "clsx";

const getImage = (src) => <img src={src} width="30" height="30" />;

const ListSelectItem = ({ images, labels, value, hideLabelForSelection }) => (
  <div className={clsx(styles.menuItem, value === 0 && styles.italic)}>
    {images && getImage(images[value])}
    {!hideLabelForSelection && <span>{labels[value]}</span>}
  </div>
);

export default ListSelectItem;
