import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const GstExpenseList = lazy(() => import("./page"));

const GstExpenseListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <GstExpenseList />
    </Suspense>
  );
};

export default GstExpenseListPage;
