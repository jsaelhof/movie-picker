import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";

import {formatRuntime} from "../../utils/format-runtime";
import {genreLabels} from "../../constants/genres";
import {sourceLogos} from "../../constants/sources";
import {titleCase} from "../../utils/title-case";
import ActionButton from "../action-button/action-button";
import ViewAction from "../view-action/view-action";
import ListCell from "../list-cell/list-cell";

import styles from "./list-row.module.css";
import Lock from "../lock/lock";

const ListRow = ({
  movie,
  onLockMovie,
  onEditMovie,
  onDeleteMovie,
  onMarkWatched,
}) => {
  return (
    <>
      <ListCell locked={movie.locked} dense>
        <Lock
          locked={movie.locked}
          onToggleLock={(locked) => {
            onLockMovie({...movie, locked});
          }}
        />
      </ListCell>
      <ListCell left locked={movie.locked} dense>
        <a
          className={styles.link}
          href={`https://www.themoviedb.org/search?query=${movie.title.replace(
            " ",
            "+",
          )}`}
          target="moviedb"
        >
          {titleCase(movie.title)}
        </a>
      </ListCell>
      <ListCell locked={movie.locked}>
        {movie.runtime ? formatRuntime(movie.runtime) : "-"}
      </ListCell>
      <ListCell locked={movie.locked}>
        {movie.genre || genreLabels[movie.genre]
          ? titleCase(genreLabels[movie.genre])
          : "-"}
      </ListCell>
      <ListCell>
        <img src={sourceLogos[movie.source]} width="40" height="40" />
      </ListCell>
      <ListCell>
        <ViewAction movie={movie} />
        <ActionButton
          Icon={EditIcon}
          tooltip="Edit"
          movie={movie}
          onClick={onEditMovie}
        />
        <ActionButton
          Icon={EyeCheckIcon}
          tooltip="Mark as Watched"
          movie={movie}
          onClick={onMarkWatched}
        />
        <ActionButton
          Icon={DeleteIcon}
          tooltip="Delete"
          movie={movie}
          onClick={onDeleteMovie}
        />
      </ListCell>
    </>
  );
};

export default ListRow;
