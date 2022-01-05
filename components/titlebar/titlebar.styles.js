import { styled } from "@mui/system";
import NavButton from "./nav-button";

export const appBarContainerStyles = ({ palette }) => ({
  flexGrow: 1,
  zIndex: 1000,
  background: `linear-gradient(75deg, ${palette.darkGrey[600]}, ${palette.darkGrey[800]} 80%)`,
});

export const toolbarStyles = {
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateAreas: `"logo nav profile"`,
  minHeight: "64px",

  "@media (max-width: 580px)": {
    gridTemplateAreas: `"nav logo profile"`,
  },
};

export const pickScreenToolbarStyles = {
  "@media (max-width: 580px)": {
    gridTemplateAreas: `"nav logo pick profile"`,
    gridTemplateColumns: "auto max-content 1fr auto",
  },
};

export const PickAgainButton = styled(NavButton)(({ theme: { spacing } }) => ({
  gridArea: "pick",
  marginRight: spacing(2),
  marginLeft: "auto",
}));
