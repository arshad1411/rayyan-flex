import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const OutstandingAccount = lazy(() => import("./page"));

const OutstandingAccountPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <OutstandingAccount />
    </Suspense>
  );
};

export default OutstandingAccountPage;
