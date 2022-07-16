import "@testing-library/jest-dom/extend-expect";
import mediaQuery from "css-mediaquery";

// Mocks a window.matchMedia call using the given width.
// Use a third-party dependency (css-mediaquery).
global.createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, {
    width,
  }),
  addListener: () => {},
  removeListener: () => {},
});
