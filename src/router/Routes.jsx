import { appConfig } from "../config/appConfig";
import LocalEntryPage from "../pages/LocalEntry";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import { elementMap } from "./elementMap";
import { LOGIN } from "./paths";
import { LOCALENTRY } from "./paths";

const buildRoutes = () => {
  const routes = [];
  routes.push(
    {
      path: LOGIN,
      element: <LoginPage />,
    },
    {
      path: LOCALENTRY,
      element: <LocalEntryPage />,
    },
  );

  appConfig.forEach((item) => {
    // 🔹 Normal link
    if (item.type === "link") {
      const Component = elementMap[item.elementKey];

      if (Component) {
        routes.push({
          path: item.path,
          element: <Component />,
        });
      }
    }

    // 🔹 Submenu children
    if (item.type === "submenu") {
      item.children.forEach((child) => {
        const Component = elementMap[child.elementKey];

        if (Component) {
          routes.push({
            path: child.path,
            element: <Component />,
          });
        }
      });
    }
  });

  // 🔹 Not Found
  routes.push({
    path: "*",
    element: <NotFound />,
  });

  return routes;
};

export const routes = buildRoutes();
