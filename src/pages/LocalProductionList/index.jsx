import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalProductionList = lazy(() => import("./page"));

const LocalProductionListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalProductionList />
    </Suspense>
  );
};

export default LocalProductionListPage;
