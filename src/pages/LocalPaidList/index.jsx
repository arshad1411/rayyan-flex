import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalPaidList = lazy(() => import("./page"));

const LocalPaidListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalPaidList />
    </Suspense>
  );
};

export default LocalPaidListPage;
