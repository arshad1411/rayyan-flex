import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Routes";

const router = createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
