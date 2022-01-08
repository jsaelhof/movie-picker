import { useSpring } from "@react-spring/core";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FullDetail from "../full-detail/full-detail";
import { ExpandedBackdrop, ExpandedContent } from "./expanded.styles";

const Expanded = ({ movie, preload, open, centerPoint, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const expandedBackdropSpring = useSpring({
    opacity: open ? 1 : 0,
  });

  const expandedSpring = useSpring({
    transformOrigin: centerPoint && `${centerPoint.x}px ${centerPoint.y}px`,
    transform: open ? "scale3d(1,1,1)" : "scale3d(0,0,0)",
    opacity: open ? 1 : 0,
    onRest: () => {
      if (isClosing) {
        setIsClosing(false);
      }
    },
  });

  return (
    <>
      {(open || isClosing) && (
        <ExpandedBackdrop
          style={expandedBackdropSpring}
          onClick={() => {
            setIsClosing(true);
            onClose();
          }}
        />
      )}

      {/* 
        Mount this on focus to preload the panel, also keep it open when open OR is animating closed.
        When just focused, it's 0x0. When expanded it animates to full size.
      */}
      {(preload || open || isClosing) &&
        createPortal(
          <ExpandedContent
            style={expandedSpring}
            onClick={(e) => e.stopPropagation()}
          >
            <FullDetail movie={movie} />
          </ExpandedContent>,
          document.body
        )}
    </>
  );
};

export default Expanded;
