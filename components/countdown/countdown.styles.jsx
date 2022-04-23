import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const needleAnim = keyframes`
    0% {
        transform: rotate(-90deg);
    }

    100% {
        transform: rotate(270deg);
    }
`;

const numberAnim = keyframes`
    0%, 10% {
        opacity: 1;
    }

    10.01%, 100% {
        opacity: 0;
    }
`;

export const Container = styled("div")(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const Frame = styled("div")(() => ({
  position: "absolute",
  width: 400,
  height: 300,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  WebkitMask: `linear-gradient(to top,  transparent 0%, #fff 10% 90%, transparent 100%),
        linear-gradient(to left, transparent 0%, #fff 10% 90%, transparent 100%)`,
  WebkitMaskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskComposite: "source-in",
}));

export const HorizontalLine = styled("div")(() => ({
  position: "absolute",
  width: "100%",
  height: 2,
  background: "#CCC",
}));
export const VerticalLine = styled("div")(() => ({
  position: "absolute",
  height: "100%",
  width: 2,
  background: "#CCC",
}));

export const Needle = styled("div")(() => ({
  position: "absolute",
  top: "calc(50% - 1px)",
  left: "50%",
  height: 2,
  width: 140,
  background: "linear-gradient(to right, #444 90%, transparent 100%)",
  animation: `${needleAnim} 1s linear infinite`,
  transformOrigin: "left",
}));

export const Circle = styled("div")(({ $size }) => ({
  position: "absolute",
  border: "5px solid white",
  width: $size,
  height: $size,
  borderRadius: "50%",
  boxShadow: "0 0 8px #CCC, inset 0 0 8px #CCC",
}));

export const Number = styled("div")(() => ({
  fontFamily: "Gill Sans, Gill Sans MT, Calibri, sans-serif",
  position: "absolute",
  fontSize: 80,
  color: "#444",
  textShadow: "0 0 5px #FFF",

  "> div": {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    animation: `${numberAnim} 10s linear infinite`,
  },
}));
