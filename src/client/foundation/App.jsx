import React from "react";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";

/** @type {React.VFC} */
export const App = () => {
  return (
    <AuthContextProvider>
      <GlobalStyle />
      <Routes />
    </AuthContextProvider>
  );
};
