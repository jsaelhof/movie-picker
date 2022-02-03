import { styled } from "@mui/material";
import SlickSlider from "react-slick";

export const StatusMessage = styled("span")`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Slider = styled(SlickSlider)(
  ({ theme: { palette, spacing } }) => ({
    margin: `0 30px ${spacing(4)}`,

    "& > button:before": {
      color: palette.grey[800],
    },
  })
);
