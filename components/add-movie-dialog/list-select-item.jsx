import { styled } from "@mui/material";

const getImage = (src) => <img src={src} width="30" height="30" />;

const ListSelectItem = ({ images, labels, value, hideLabelForSelection }) => (
  <Item value={value}>
    {images && getImage(images[value])}
    {!hideLabelForSelection && <span>{labels[value]}</span>}
  </Item>
);

const Item = styled("div")`
  display: flex;
  align-items: center;
  column-gap: ${({ theme: { spacing } }) => spacing(1)};

  ${({ value }) =>
    value === 0 && {
      fontStyle: "italic",
    }}
`;

export default ListSelectItem;
