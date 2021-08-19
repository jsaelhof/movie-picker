import clsx from "clsx";
import EditIcon from "@material-ui/icons/Edit";
import EyeCheckIcon from "mdi-material-ui/EyeCheck";

import { formatRuntime } from "../../utils/format-runtime";
import { genreLabels } from "../../constants/genres";
import { searchStreaming, searchTMDB } from "../../utils/search";
import { sourceLogos, sources } from "../../constants/sources";
import { titleCase } from "../../utils/title-case";
import { useResponsive } from "../../hooks/use-responsive";
import ActionButton from "../action-button/action-button";
import ListCell from "../list-cell/list-cell";
import Lock from "../lock/lock";
import MoreAction from "../more-action/more-action";

import styles from "./list-row.module.css";

const ListRow = ({
  movie,
  onLockMovie,
  onEditMovie,
  onDeleteMovie,
  onMarkWatched,
}) => {
  const { minimalColumns, fullFeatures } = useResponsive();

  return (
    <>
      <ListCell locked={movie.locked} dense>
        <Lock
          locked={movie.locked}
          onToggleLock={(locked) => {
            onLockMovie({ ...movie, locked });
          }}
        />
      </ListCell>
      <ListCell
        left
        locked={movie.locked}
        dense
        classes={clsx(minimalColumns && styles.titleCell)}
      >
        <a
          className={clsx(styles.link, minimalColumns && styles.title)}
          href={searchTMDB(movie.title)}
          target="moviedb"
        >
          {titleCase(movie.title)}
        </a>
      </ListCell>
      {fullFeatures && (
        <>
          <ListCell locked={movie.locked}>
            {movie.runtime ? formatRuntime(movie.runtime) : "-"}
          </ListCell>
          <ListCell locked={movie.locked}>
            {movie.genre || genreLabels[movie.genre]
              ? titleCase(genreLabels[movie.genre])
              : "-"}
          </ListCell>
          <ListCell
            onClick={
              ![sources.DVD, sources.NONE].includes(movie.source)
                ? () =>
                    window.open(
                      searchStreaming(movie.title, movie.source),
                      "movieView"
                    )
                : undefined
            }
          >
            <img src={sourceLogos[movie.source]} width="40" height="40" />
          </ListCell>
        </>
      )}
      <ListCell>
        {fullFeatures && (
          <ActionButton
            Icon={EditIcon}
            tooltip="Edit"
            movie={movie}
            onClick={onEditMovie}
          />
        )}
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
