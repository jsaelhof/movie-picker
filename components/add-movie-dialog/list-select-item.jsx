import { Item } from "./list-select-item.styles";

const getImage = (src) => <img src={src} width="30" height="30" />;

const ListSelectItem = ({ images, labels, value, hideLabelForSelection }) => (
  <Item value={value}>
    {images && getImage(images[value])}
    {!hideLabelForSelection && <span>{labels[value]}</span>}
  </Item>
);

export default ListSelectItem;
