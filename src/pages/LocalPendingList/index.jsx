import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalPendingList = lazy(() => import("./page"));

const LocalPendingListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalPendingList />
    </Suspense>
  );
};

export default LocalPendingListPage;
