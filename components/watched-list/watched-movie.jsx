import { useQuery } from "@apollo/client";
import { format, parseISO } from "date-fns";
import { useRef, useState } from "react";
import { GET_MOVIE_EXTENDED_DETAILS } from "../../graphql";
import DatePicker from "../date-picker/date-picker";
import MoviePoster from "../movie-poster/movie-poster";
import {
  Backdrop,
  BackdropWrapper,
  Container,
  InfoLayout,
  PosterLayout,
  InfoTitle,
  InfoDate,
  Editing,
} from "./watched-movie.styles";
import { useResponsive } from "../../hooks/use-responsive";

const WatchedMovie = ({
  movie,
  right = false,
  isEditing,
  onEditMovie,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { data } = useQuery(GET_MOVIE_EXTENDED_DETAILS, {
    errorPolicy: "all",
    variables: {
      imdbID: movie.imdbID,
    },
  });

  const { mobile } = useResponsive();
  const [editedMovie, setEditedMovie] = useState(null);

  // If the date is in process of being changed use that otherwise use the date from the movie.
  const watchedDate = new Date(
    isEditing ? editedMovie.watchedOn : movie.watchedOn
  );

  // Try parallaxing the background image by moving it's background position on scroll
  const ref = useRef();

  const nodes = [
    <PosterLayout key={`${movie.id}-poster`}>
      <MoviePoster movie={movie} />
    </PosterLayout>,
    <InfoLayout key={`${movie.id}-info`} $right={right}>
      <InfoTitle>{movie.title}</InfoTitle>
      <InfoDate
        onClick={({ target, currentTarget }) => {
          // Make sure the click is not on a child element (the date picker elements)
          if (target === currentTarget) {
            setEditedMovie({ ...movie });
            onEditMovie(movie);
          }
        }}
      >
        {format(parseISO(movie.watchedOn), "EEEE MMMM do, yyyy")}

        {isEditing && (
          <DatePicker
            useDrawer={mobile}
            right={right}
            defaultDate={watchedDate}
            onChange={(day) => {
              setEditedMovie((state) => ({
                ...state,
                watchedOn: day.toISOString(),
              }));
            }}
            onSave={() => {
              onSave(editedMovie);
              setEditedMovie(null);
            }}
            onCancel={() => {
              onCancel();
              setEditedMovie(null);
            }}
          />
        )}
      </InfoDate>
    </InfoLayout>,
  ];

  return (
    <Container
      key={movie.id}
      ref={ref}
      $right={right}
      sx={[isEditing && Editing]}
    >
      <BackdropWrapper>
        <Backdrop
          sx={{
            backgroundImage: `url(${data?.tmdbMovie?.backdrop})`,
          }}
        />
      </BackdropWrapper>
      {right ? nodes.reverse() : nodes}
    </Container>
  );
};

export default WatchedMovie;
