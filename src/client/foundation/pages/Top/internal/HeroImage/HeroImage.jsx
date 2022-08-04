import React from "react";
import styled from "styled-components";

const WIDTH = 1024;
const HEIGHT = 734;

const Placeholder = styled.div`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  if (url == null) {
    return <Placeholder />
  }
  return <Image alt="" height={HEIGHT} src={url} width={WIDTH} />;
};
