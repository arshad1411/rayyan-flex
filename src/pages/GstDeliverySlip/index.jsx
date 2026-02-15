import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const GstDeliverySlip = lazy(() => import("./page"));

const GstDeliverySlipPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <GstDeliverySlip />
    </Suspense>
  );
};

export default GstDeliverySlipPage;
