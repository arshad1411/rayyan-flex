import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const QuotationEntry = lazy(() => import("./page"));

const QuotationEntryPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <QuotationEntry />
    </Suspense>
  );
};

export default QuotationEntryPage;
