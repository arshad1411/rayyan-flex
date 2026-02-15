import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const QuotationList = lazy(() => import("./page"));

const QuotationListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <QuotationList />
    </Suspense>
  );
};

export default QuotationListPage;
