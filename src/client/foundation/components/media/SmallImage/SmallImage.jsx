import React from "react";

import { baseName } from "../../../utils/UrlUtils";

/**
 * @typedef Props
 * @property {string} src
 */

/** @type {React.VFC<Props>} */
export const SmallImage = ({ src, ...attrs }) => {
  return <img {...attrs} height="100" src={`${baseName(src)}.small.webp`} width="100" />;
};
