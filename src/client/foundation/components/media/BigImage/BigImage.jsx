import React from "react";
import styled from "styled-components";

import { baseName } from "../../../utils/UrlUtils";

const WIDTH = 400;
const HEIGHT = 225;

const Placeholder = styled.div`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`;

/**
 * @typedef Props
 * @property {string} src
 */

/** @type {React.VFC<Props>} */
export const BigImage = ({ src, ...attrs }) => {
  if (src == null) return <Placeholder />;
  return <img {...attrs} height={HEIGHT} src={`${baseName(src)}.big.webp`} width={WIDTH} />;
}
