import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import "./styles/tailwindThemeStyles.css"
// import "react-leaflet-markercluster/dist/styles.min.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Layout,
  Error,
  Home,
  CustomMap,
  ThemeContextProvider,
  AuthContextProvider,
} from "./AllPages";
import ManageData from "./data/ManageData";
import AdministrativeFilterContextProvider from "./contextProvider/AdministrativeFilterContextProvider";

const routerEle = (
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route path="" element={<Home />}></Route>
    <Route path="pages" element={<Outlet />}>
      <Route path="custom-map" element={<CustomMap />}></Route>
      <Route path="manage-data" element={<ManageData />}></Route>
    </Route>
  </Route>
);

const createdRouterEle = createRoutesFromElements(routerEle);
const browserRoute = createBrowserRouter(createdRouterEle);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <AdministrativeFilterContextProvider>

        <RouterProvider router={browserRoute}>{/* <App /> */}</RouterProvider>
        </AdministrativeFilterContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
