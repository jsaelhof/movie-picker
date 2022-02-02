import { useSpring } from "react-spring";
import { useCallback, useState } from "react";
import { useOnWindowResize } from "rooks";

import { Layout, Shade, TextArea } from "./scroll-area.styles";

const ScrollArea = ({ text, noScroll }) => {
  const [topOverflow, setTopOverflow] = useState(null);
  const [bottomOverflow, setBottomOverflow] = useState(null);

  const [textNode, setTextNode] = useState(null);

  // Callback ref: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
  const onPlotRefChange = useCallback(
    (node) => {
      // Set the node ref recieved.
      setTextNode(node);

      // Update the scroll positions
      node && updateOverflows(node);
    },
    [updateOverflows]
  );

  const onPlotScroll = useCallback(
    ({ target }) => {
      updateOverflows(target);
    },
    [updateOverflows]
  );

  const updateOverflows = useCallback(
    ({ scrollTop, scrollHeight, clientHeight }) => {
      setTopOverflow(scrollTop > 0);
      setBottomOverflow(scrollHeight - clientHeight - scrollTop > 0);
    },
    []
  );

  useOnWindowResize(() => {
    updateOverflows(textNode);
  });

  const plotShadeTopSpring = useSpring({
    opacity: topOverflow ? 1 : 0,
  });

  const plotShadeBottomSpring = useSpring({
    opacity: bottomOverflow ? 1 : 0,
  });

  return (
    <Layout>
      <TextArea
        ref={onPlotRefChange}
        onScroll={onPlotScroll}
        noScroll={noScroll}
      >
        {text}
      </TextArea>
      <Shade align="top" style={plotShadeTopSpring} />
      <Shade align="bottom" style={plotShadeBottomSpring} />
    </Layout>
  );
};

export default ScrollArea;
