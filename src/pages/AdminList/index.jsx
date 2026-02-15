import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const AdminList = lazy(() => import("./page"));

const AdminListPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <AdminList />
    </Suspense>
  );
};

export default AdminListPage;
