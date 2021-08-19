import { useResponsive } from "../../hooks/use-responsive";
import ListHeaderCell from "../list-header-cell/list-header-cell";

const ListHeaderRow = ({ count, onSort }) => {
  const { fullFeatures } = useResponsive();

  return (
    <>
      <ListHeaderCell>&nbsp;</ListHeaderCell>
      <ListHeaderCell
        left
        dense
        onClick={() => onSort("title")}
      >{`Movies (${count})`}</ListHeaderCell>
      {fullFeatures && (
        <>
          <ListHeaderCell onClick={() => onSort("runtime")}>
            Runtime
          </ListHeaderCell>
          <ListHeaderCell onClick={() => onSort("genre")}>Genre</ListHeaderCell>
          <ListHeaderCell>Source</ListHeaderCell>
        </>
      )}
      <ListHeaderCell>Actions</ListHeaderCell>
    </>
  );
};

export default ListHeaderRow;
