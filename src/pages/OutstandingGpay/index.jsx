import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const OutstandingGpay = lazy(() => import("./page"));

const OutstandingGpayPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <OutstandingGpay />
    </Suspense>
  );
};

export default OutstandingGpayPage;
