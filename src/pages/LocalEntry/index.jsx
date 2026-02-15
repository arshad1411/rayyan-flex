import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const LocalEntry = lazy(() => import("./page"));

const LocalEntryPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <LocalEntry />
    </Suspense>
  );
};

export default LocalEntryPage;
