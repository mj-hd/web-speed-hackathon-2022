import React from "react";
import styled from "styled-components";

import { baseName } from "../../../utils/UrlUtils";

const WIDTH = 100;
const HEIGHT = 100;

const Placeholder = styled.div`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`;

/**
 * @typedef Props
 * @property {string} src
 */

/** @type {React.VFC<Props>} */
export const SmallImage = ({ src, ...attrs }) => {
  if (src == null) return <Placeholder />;
  return <img {...attrs} height="100" src={`${baseName(src)}.small.webp`} width="100" />;
};
