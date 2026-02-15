import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalExpenseList = lazy(() => import("./page"));

const LocalExpenseListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalExpenseList />
    </Suspense>
  );
};

export default LocalExpenseListPage;
