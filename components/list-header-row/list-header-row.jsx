import ListHeaderCell from "../list-header-cell/list-header-cell";

const ListHeaderRow = ({count, onSort}) => {
  return (
    <>
      <ListHeaderCell
        left
        onClick={() => onSort("title")}
      >{`Movies (${count})`}</ListHeaderCell>
      <ListHeaderCell onClick={() => onSort("runtime")}>Runtime</ListHeaderCell>
      <ListHeaderCell onClick={() => onSort("genre")}>Genre</ListHeaderCell>
      <ListHeaderCell>Source</ListHeaderCell>
      <ListHeaderCell>Actions</ListHeaderCell>
    </>
  );
};

export default ListHeaderRow;
