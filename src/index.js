import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout, Error, Home, CustomMap } from "./AllPages";

const routerEle = (
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route path="" element={<Home />}></Route>
    <Route path="pages" element={<Outlet />}>
      <Route path="custom-map" element={<CustomMap />}></Route>
    </Route>
  </Route>
);

const createdRouterEle = createRoutesFromElements(routerEle);
const browserRoute = createBrowserRouter(createdRouterEle);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={browserRoute}>{/* <App /> */}</RouterProvider>
  </React.StrictMode>
);
