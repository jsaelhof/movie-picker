export const POSTER_WIDTH = 160;
export const POSTER_GAP = 16;

const calcNumColumns = (w, n = 1) => {
  if (!w || w <= POSTER_WIDTH) return 1;

  if (160 + n * (POSTER_WIDTH + POSTER_GAP) < w) {
    return calcNumColumns(w, n + 1);
  } else {
    return n;
  }
};

export const useGridColumns = (currentWidth) => {
  const numColumns = calcNumColumns(currentWidth);
  const zoomsWillOverflow =
    window.innerWidth -
      (numColumns * POSTER_WIDTH + (numColumns - 1) * POSTER_GAP) <
    90;

  return [numColumns, zoomsWillOverflow];
};
