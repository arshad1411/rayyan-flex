import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const PriceList = lazy(() => import("./page"));

const PriceListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <PriceList />
    </Suspense>
  );
};

export default PriceListPage;
