import { styled } from "@mui/material";
import { animated } from "react-spring";

export const Layout = styled("div")(() => ({
  position: "relative",
}));

export const TextArea = styled("div")`
  line-height: 1.7;
  max-height: 180px;
  overflow-y: scroll;
  ${({ noScroll, theme: { palette } }) => ({
    color: palette.grey[900],
    ...(noScroll && {
      maxHeight: "unset",
      overflowY: "initial",
    }),
  })}
`;

export const Shade = styled(animated.div)(({ align }) => {
  const alignedProps = {
    top: { gradientAngle: "to bottom", styles: { top: 0 } },
    bottom: { gradientAngle: "to top", styles: { bottom: 0 } },
  }[align];

  return {
    position: "absolute",
    width: "100%",
    height: 10,
    backgroundImage: `linear-gradient(to right, white 0%, transparent 7%, transparent 93%, white 100%), linear-gradient(${alignedProps.gradientAngle}, white, rgba(0,0,0,0.07) 30%, transparent)`,
    ...alignedProps.styles,
    left: 0,
  };
});
