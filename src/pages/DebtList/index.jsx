import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const DebtList = lazy(() => import("./page"));

const DebtListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <DebtList />
    </Suspense>
  );
};

export default DebtListPage;
