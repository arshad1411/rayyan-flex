import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const GstExpenseEntry = lazy(() => import("./page"));

const GstExpenseEntryPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <GstExpenseEntry />
    </Suspense>
  );
};

export default GstExpenseEntryPage;
