import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: calc((1033 / 1440) * 100%);
`;

const Image = styled.img`
  position: absolute;
`;

/**
 * @typedef Props
 * @type {object}
 * @property {string} url
 */

/** @type {React.VFC<Props>} */
export const HeroImage = ({ url }) => {
  return <Wrapper>{url != null && <Image alt="" src={url} />}</Wrapper>;
};
