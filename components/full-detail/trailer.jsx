import styles from "./trailer.module.css";

import { useSpring } from "@react-spring/core";
import { useState } from "react";
import { TrailerLayout, YouTubePlayer } from "./trailer.styles";

const Trailer = ({ trailerId, onComplete }) => {
  const [trailerActive, setTrailerActive] = useState(null);

  const trailerSpring = useSpring({
    opacity: trailerActive ? 1 : 0,
    onRest: () => {
      if (!trailerActive) {
        onComplete(null);
      }
    },
  });

  return (
    <TrailerLayout style={trailerSpring}>
      <YouTubePlayer
        videoId={trailerId}
        containerClassName={styles.wrapper}
        opts={{
          playerVars: {
            autoplay: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            controls: 0,
          },
        }}
        onReady={() => setTrailerActive(true)}
        onEnd={() => setTrailerActive(false)}
      />
    </TrailerLayout>
  );
};

export default Trailer;
