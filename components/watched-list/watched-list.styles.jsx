import { Paper, styled } from "@mui/material";

export const ListContainer = styled(Paper)(({ theme: { spacing } }) => ({
  marginTop: spacing(6),
  marginBottom: spacing(6),
}));

export const List = styled("div")`
  display: grid;
  grid-template-columns: auto max-content max-content;
  align-items: center;
`;
