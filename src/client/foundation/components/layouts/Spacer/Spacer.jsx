import React from "react";
import styled from "styled-components";

const spacingMap = {
  m: "--margin",
  mb: "--marginBottom",
  ml: "--marginLeft",
  mr: "--marginRight",
  mt: "--marginTop",

  p: "--padding",
  pb: "--paddingBottom",
  pl: "--paddingLeft",
  pr: "--paddingRight",
  pt: "--paddingTop",
};

const Wrapper = styled.div`
  margin: var(--margin);
  margin-bottom: var(--marginBottom);
  margin-left: var(--marginLeft);
  margin-right: var(--marginRight);
  margin-top: var(--marginTop);
  padding: var(--padding);
  padding-bottom: var(--paddingBottom);
  padding-left: var(--paddingLeft);
  padding-right: var(--paddingRight);
  padding-top: var(--paddingTop);
`;

/** @type {React.FC<{ [K in keyof spacingMap]?: number | string }>} */
export const Spacer = ({ children, ...rest }) => {
  const variables = Object.entries(spacingMap).reduce((acc, [key, cssVar]) => {
    const val = rest[key];
    acc[cssVar] = "0px";

    if (val != null) {
      acc[cssVar] = typeof val === "number" ? `${val}px` : `${val}`;
    }

    return acc;
  }, {});

  return <Wrapper style={variables}>{children}</Wrapper>;
};
