import { styled, TextField } from "@mui/material";
import Ratings from "../ratings/ratings";

import ListSelect from "./list-select";
import MoviePoster from "./movie-poster";

export const Input = styled("div")(({ theme: { breakpoints, spacing } }) => ({
  margin: `${spacing(2)} 0 ${spacing(8)}`,
  display: "grid",
  gridTemplateColumns: "180px 100px 100px 150px 175px auto",
  gridTemplateRows: "30px repeat(3, 40px)",
  gridTemplateAreas: `
      "poster . . . . ."
      "poster title title title title title"
      "poster runtime year genre source ratings"
    `,
  columnGap: spacing(2),
  rowGap: spacing(2),
  alignItems: "flex-start",

  "& > *": {
    margin: 0,
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },

  [breakpoints.down(1140)]: {
    gridTemplateRows: "10px repeat(4, 40px)",
    gridTemplateColumns: "180px 100px 100px 150px 175px auto",
    gridTemplateAreas: `
        "poster . . . . ."
        "poster title title title title title"
        "poster runtime year genre source ."
        "poster ratings ratings ratings ratings ratings"
      `,
  },

  [breakpoints.down(885)]: {
    gridTemplateRows: "repeat(4, 40px)",
    gridTemplateColumns: "180px 100px 75px 75px auto",
    gridTemplateAreas: `
        "poster title title title title"
        "poster runtime genre genre ."
        "poster year source source ."
        "poster ratings ratings ratings ratings"
      `,
  },

  [`${breakpoints.down(600)}, (max-height: 414px)`]: {
    justifyContent: "center",
    gridTemplateColumns: "125px 125px",
    gridTemplateRows: "auto repeat(5, 40px)",
    gridTemplateAreas: `
        "poster poster"
        "title title"
        "runtime year"
        "genre genre"
        "source source"
        "ratings ratings"
      `,
    marginBottom: spacing(4),
  },
}));

export const Poster = styled(MoviePoster)`
  grid-area: poster;
`;

export const Title = styled(TextField)`
  grid-area: title;
`;

export const Runtime = styled(TextField)`
  grid-area: runtime;
`;

export const Genre = styled(ListSelect)(() => ({
  gridArea: "genre",

  "& > div": {
    padding: "8.5px 14px",
  },
}));

export const Year = styled(TextField)`
  grid-area: year;
`;

export const Source = styled(ListSelect)(() => ({
  gridArea: "source",

  "& > div": {
    padding: "5px 14px",
  },
}));

export const StyledRatings = styled(Ratings)(
  ({ theme: { breakpoints, spacing } }) => ({
    gridArea: "ratings",
    justifySelf: "flex-end",
    paddingRight: spacing(2),

    [breakpoints.down(1140)]: {
      justifySelf: "flex-start",
    },

    [`${breakpoints.down(600)}, (max-height: 414px)`]: {
      justifySelf: "center",
      paddingRight: 0,
    },
  })
);
