import { lazy, Suspense } from "react";
import PreLoader from "../../components/Preloader/Preloader";

const Dashboard = lazy(() => import("./page"));

const DashboardPage = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
