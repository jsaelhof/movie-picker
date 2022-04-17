import { styled } from "@mui/material";

export const LogoContainer = styled("div")(({ theme: { spacing } }) => ({
  gridArea: "logo",
  display: "grid",
  gridAutoFlow: "column",
  gap: spacing(1),
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
}));
