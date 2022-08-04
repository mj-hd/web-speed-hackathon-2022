import { createGlobalStyle } from "styled-components";

import { Color } from "./variables";

const resetCss = `
*,*::before,*::after{box-sizing:border-box}body,h1,h2,h3,h4,p,figure,blockquote,dl,dd{margin:0}ul[role="list"],ol[ro
le="list"]{list-style:none}html:focus-within{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpe
ed;line-height:1.5}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}input,butto
n,textarea,select{font:inherit}@media(prefers-reduced-motion:reduce){html:focus-within{scroll-behavior:auto}*,*::bef
ore,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !i
mportant;scroll-behavior:auto !important}}
`;

export const GlobalStyle = createGlobalStyle`
  ${resetCss}

  body {
    color: ${Color.mono[900]};
    background: ${Color.mono[100]};
    font-family: sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  @font-face {
    font-family: "Senobi-Gothic";
    font-weight: normal;
    font-display: block;
    src: url("/assets/fonts/MODI_Senobi-Gothic_2017_0702/Senobi-Gothic-Regular.woff") format("woff");
  }

  @font-face {
    font-family: "Senobi-Gothic";
    font-weight: bold;
    font-display: block;
    src: url("/assets/fonts/MODI_Senobi-Gothic_2017_0702/Senobi-Gothic-Bold.woff") format("woff");
  }
`;
