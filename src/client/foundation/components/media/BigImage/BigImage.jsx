import React from "react";

import { baseName } from "../../../utils/UrlUtils";

/**
 * @typedef Props
 * @property {string} src
 */

/** @type {React.VFC<Props>} */
export const BigImage = ({ src, ...attrs }) => {
  return <img {...attrs} height="225" src={`${baseName(src)}.big.png`} width="400" />;
}
