import React from "react";

/**
 * @typedef Props
 * @property {string} src
 */

/** @type {React.VFC<Props>} */
export const SmallImage = ({ src, ...attrs }) => {
  return <img {...attrs} height="100" src={`${src}.small.webp`} width="100" />;
};
