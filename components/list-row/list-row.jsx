import EditIcon from "@material-ui/icons/Edit";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";

import {formatRuntime} from "../../utils/format-runtime";
import {genreLabels} from "../../constants/genres";
import {sourceLogos} from "../../constants/sources";
import {titleCase} from "../../utils/title-case";
import ActionButton from "../action-button/action-button";
import ListCell from "../list-cell/list-cell";
import Lock from "../lock/lock";
import MoreAction from "../more-action/more-action";

import styles from "./list-row.module.css";
import {searchTMDB} from "../../utils/search";

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
          href={searchTMDB(movie.title)}
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
        <MoreAction movie={movie} onDeleteMovie={onDeleteMovie} />
      </ListCell>
    </>
  );
};

export default ListRow;
