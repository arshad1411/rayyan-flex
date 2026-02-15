import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalExpenseApprove = lazy(() => import("./page"));

const LocalExpenseApprovePage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalExpenseApprove />
    </Suspense>
  );
};

export default LocalExpenseApprovePage;
