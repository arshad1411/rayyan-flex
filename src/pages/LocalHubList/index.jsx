import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalHubList = lazy(() => import("./page"));

const LocalHubListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalHubList />
    </Suspense>
  );
};

export default LocalHubListPage;
