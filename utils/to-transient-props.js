import { reduce } from "lodash";

// Styled components requires props that are not intended to appear in the dom
// to be prefixed with a $. This method takes props and does the prefixing
// allowing greater flexibilty.
// https://styled-components.com/docs/api#transient-props
export const toTransientProps = (props) =>
  reduce(
    props,
    (transientProps, value, key) => {
      transientProps[`$${key}`] = value;
      return transientProps;
    },
    {}
  );
