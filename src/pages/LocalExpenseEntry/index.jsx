import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalExpenseEntry = lazy(() => import("./page"));

const LocalExpenseEntryPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalExpenseEntry />
    </Suspense>
  );
};

export default LocalExpenseEntryPage;
