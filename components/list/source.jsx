import { sourceLabels, sourceLogos } from "../../constants/sources";
import { SourceBorder, SourceImage, SourceLayout } from "./source.styles";

const Source = ({ source }) => (
  <SourceLayout>
    <SourceBorder />
    <SourceImage
      aria-label={sourceLabels[source]}
      sx={{
        backgroundImage: `url("${sourceLogos[source]}")`,
      }}
    />
  </SourceLayout>
);

export default Source;
