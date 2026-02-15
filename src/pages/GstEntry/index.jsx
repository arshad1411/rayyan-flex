import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const GstEntry = lazy(() => import("./page"));

const GstEntryPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <GstEntry />
    </Suspense>
  );
};

export default GstEntryPage;
