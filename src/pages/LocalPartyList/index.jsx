import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalPartyList = lazy(() => import("./page"));

const LocalPartyListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalPartyList />
    </Suspense>
  );
};

export default LocalPartyListPage;
