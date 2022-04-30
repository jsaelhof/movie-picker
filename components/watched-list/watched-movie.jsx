import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useGetMovieExtendedDetails } from "../../graphql/queries";
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
  Content,
} from "./watched-movie.styles";
import { useMediaQuery } from "@mui/material";
import { useSpring } from "react-spring";

const WatchedMovie = ({
  movie,
  right = false,
  isEditing,
  onEditMovie,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { data } = useGetMovieExtendedDetails(movie);

  const small = useMediaQuery("(max-width: 550px)");
  const xsmall = useMediaQuery("(max-width: 430px)");
  const [editedMovie, setEditedMovie] = useState(null);
  const [datePickerMounted, setDatePickerMounted] = useState(null);

  const calendarSpring = useSpring({
    mounted: isEditing ? 1 : 0,
    transform: isEditing
      ? "translateX(0px)"
      : `translateX(${right ? "-" : ""}200px)`,
    opacity: isEditing ? 1 : 0,
    onRest: ({ value: { mounted } }) => {
      !mounted && setDatePickerMounted(false);
    },
  });

  // If the date is in process of being changed use that otherwise use the date from the movie.
  const watchedDate = new Date(
    isEditing ? editedMovie.watchedOn : movie.watchedOn
  );

  const nodes = [
    <PosterLayout key={`${movie.id}-poster`}>
      <MoviePoster movie={movie} height={small ? 200 : 270} />
    </PosterLayout>,
    <InfoLayout key={`${movie.id}-info`} $right={right}>
      <InfoTitle>{movie.title}</InfoTitle>
      <InfoDate>
        {format(
          parseISO(movie.watchedOn),
          (xsmall && "EEE, MMM do, yyyy") ||
            (small && "EEEE, MMM do, yyyy") ||
            "EEEE, MMMM do, yyyy"
        )}
      </InfoDate>
    </InfoLayout>,
  ];

  return (
    <Container
      data-id={movie.id}
      key={movie.id}
      onClick={() => {
        if (isEditing) {
          onCancel();
          setEditedMovie(null);
        } else {
          setDatePickerMounted(true);
          setEditedMovie({ ...movie });
          onEditMovie(movie);
        }
      }}
    >
      <BackdropWrapper>
        <Backdrop
          sx={{
            backgroundImage: `url(${movie.background || data?.backdrop})`,
          }}
        />
      </BackdropWrapper>
      <Content $right={right}>
        {right ? nodes.reverse() : nodes}

        {datePickerMounted && (
          <DatePicker
            spring={calendarSpring}
            useDrawer={small}
            title={movie.title}
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
            onDelete={() => {
              onCancel();
              onDelete(movie);
            }}
          />
        )}
      </Content>
    </Container>
  );
};

export default WatchedMovie;
