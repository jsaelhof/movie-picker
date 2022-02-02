import { useOnWindowResize } from "rooks";

import { useSpring } from "@react-spring/core";
import { useCallback, useState } from "react";
import {
  TrailerInline,
  TrailerOverlay,
  YouTubePlayerInline,
  YouTubePlayerOverlay,
} from "./trailer.styles";

// This is making an assumption that the youtube player is always 640x360.
// The video is actually varying sizes postioned centered within this by youtube.
const youTubeIframe = {
  width: 640,
  height: 360,
};

const Trailer = ({ trailerId, overlay, onComplete }) => {
  const [trailerActive, setTrailerActive] = useState(null);

  const trailerSpring = useSpring({
    opacity: trailerActive ? 1 : 0,
    onRest: () => {
      if (!trailerActive) {
        onComplete();
      }
    },
  });

  const [trailerNode, setTrailerNode] = useState();
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const updateSize = (node) => {
    if (!node) return;

    const ratio = Math.max(
      node.clientWidth / youTubeIframe.width,
      node.clientHeight / youTubeIframe.height
    );

    setSize({
      width: youTubeIframe.width * ratio,
      height: youTubeIframe.height * ratio,
    });
  };

  // Callback Ref
  const trailerRef = useCallback((node) => {
    setTrailerNode(node);
    updateSize(node);
  }, []);

  useOnWindowResize(() => {
    updateSize(trailerNode);
  });

  const TrailerLayout = overlay ? TrailerOverlay : TrailerInline;
  const YouTubePlayer = overlay ? YouTubePlayerOverlay : YouTubePlayerInline;

  return (
    <TrailerLayout
      style={trailerSpring}
      ref={trailerRef}
      onClick={() => overlay && onComplete()}
    >
      <YouTubePlayer
        videoId={trailerId}
        width={size.width}
        height={size.height}
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
