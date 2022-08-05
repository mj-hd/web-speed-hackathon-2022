import loadable from '@loadable/component';
import React, { Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
const Top = loadable(() => import(/* webpackChunkName: "top" */ "./pages/Top/Top"));
//const Odds = loadable(() => import(/* webpackChunkName: "odds" */ "./pages/races/Odds"));
//const RaceCard = loadable(() => import(/* webpackChunkName: "raceCard" */ "./pages/races/RaceCard"));
//const RaceResult = loadable(() => import(/* webpackChunkName: "raceResult" */ "./pages/races/RaceResult"));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterRoutes>
        <Route element={<CommonLayout />} path="/">
          <Route index element={<Top />} />
          <Route element={<Top />} path=":date" />
        </Route>
      </RouterRoutes>
    </Suspense>
  );
};
