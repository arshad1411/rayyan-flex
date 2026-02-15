import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const OutstandingCash = lazy(() => import("./page"));

const OutstandingCashPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <OutstandingCash />
    </Suspense>
  );
};

export default OutstandingCashPage;
