import React, { Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
const Top = React.lazy(() => import(/* webpackChunkName: "top" */ "./pages/Top"));
const Odds = React.lazy(() => import(/* webpackChunkName: "odds" */ "./pages/races/Odds"));
const RaceCard = React.lazy(() => import(/* webpackChunkName: "raceCard" */ "./pages/races/RaceCard"));
const RaceResult = React.lazy(() => import(/* webpackChunkName: "raceResult" */ "./pages/races/RaceResult"));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterRoutes>
        <Route element={<CommonLayout />} path="/">
          <Route index element={<Top />} />
          <Route element={<Top />} path=":date" />
          <Route path="races/:raceId">
            <Route element={<RaceCard />} path="race-card" />
            <Route element={<Odds />} path="odds" />
            <Route element={<RaceResult />} path="result" />
          </Route>
        </Route>
      </RouterRoutes>
    </Suspense>
  );
};
