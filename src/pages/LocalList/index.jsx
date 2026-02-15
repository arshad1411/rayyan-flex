import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalList = lazy(() => import("./page"));

const LocalListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalList />
    </Suspense>
  );
};

export default LocalListPage;
