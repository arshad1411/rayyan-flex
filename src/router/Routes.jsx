import { LOGIN, DASHBOARD } from "./paths";

import Login from "../pages/Login/page";
import Dashboard from "../pages/Dashboard/page";

export const routes = [
  { path: LOGIN, element: <Login /> },
  { path: DASHBOARD, element: <Dashboard /> },
];
