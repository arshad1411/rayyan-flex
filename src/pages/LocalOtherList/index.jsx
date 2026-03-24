import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalOtherList = lazy(() => import("./page"));

const LocalOtherListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalOtherList />
    </Suspense>
  );
};

export default LocalOtherListPage;
