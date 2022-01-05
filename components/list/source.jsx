import { sourceLogos } from "../../constants/sources";
import { SourceBorder, SourceImage, SourceLayout } from "./source.styles";

const Source = ({ source }) => (
  <SourceLayout>
    <SourceBorder />
    <SourceImage
      sx={{
        backgroundImage: `url("${sourceLogos[source]}")`,
      }}
    />
  </SourceLayout>
);

export default Source;
