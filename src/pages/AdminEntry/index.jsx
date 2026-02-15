import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const AdminEntry = lazy(() => import("./page"));

const AdminEntryPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <AdminEntry />
    </Suspense>
  );
};

export default AdminEntryPage;
