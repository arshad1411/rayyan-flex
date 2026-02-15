import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const Login = lazy(() => import("./page"));

const LoginPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
