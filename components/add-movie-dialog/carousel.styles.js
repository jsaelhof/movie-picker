import { styled } from "@mui/material";
import SlickSlider from "react-slick";

export const StatusMessage = styled("div")`
  height: 280px;
  text-align: center;
`;

export const Slider = styled(SlickSlider)(
  ({ theme: { palette, spacing } }) => ({
    margin: `0 30px ${spacing(4)}`,

    "& > button:before": {
      color: palette.grey[800],
    },
  })
);
