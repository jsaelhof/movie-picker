import { styled } from "@mui/material";

const getImage = (src) => <img src={src} width="30" height="30" />;

const ListSelectItem = ({ images, labels, value, hideLabelForSelection }) => (
  <Item value={value}>
    {images && getImage(images[value])}
    {!hideLabelForSelection && <span>{labels[value]}</span>}
  </Item>
);

const Item = styled("div")(({ theme: { spacing }, value }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: spacing(1),

  ...(value === 0 && {
    fontStyle: "italic",
  }),
}));

export default ListSelectItem;
