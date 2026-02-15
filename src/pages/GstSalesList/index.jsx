import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const GstSalesList = lazy(() => import("./page"));

const GstSalesListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <GstSalesList />
    </Suspense>
  );
};

export default GstSalesListPage;
