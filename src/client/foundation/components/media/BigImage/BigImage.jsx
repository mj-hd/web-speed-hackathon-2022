import React from "react";

/**
 * @typedef Props
 * @property {string} src
 */

/** @type {React.VFC<Props>} */
export const BigImage = ({ src, ...attrs }) => {
  return <img {...attrs} height="225" src={`${src}.big.webp`} width="400" />;
}
