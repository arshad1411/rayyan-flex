import AdminList from "../pages/AdminList";
import Dashboard from "../pages/Dashboard";
import DebtList from "../pages/DebtList";
import GstDeliverySlip from "../pages/GstDeliverySlip";
import GstEntry from "../pages/GstEntry/page";
import GstExpenseEntry from "../pages/GstExpenseEntry";
import GstExpenseList from "../pages/GstExpenseList";
import GstSalesList from "../pages/GstSalesList";
import LocalExpenseApprove from "../pages/LoacalExpenseApprove/page";
import LocalEntry from "../pages/LocalEntry";
import LocalExpenseEntry from "../pages/LocalExpenseEntry";
import LocalExpenseList from "../pages/LocalExpenseList";
import LocalList from "../pages/LocalList";
import LocalPaidList from "../pages/LocalPaidList";
import LocalPartyList from "../pages/LocalPartyList";
import LocalPendingList from "../pages/LocalPendingList";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import OutstandingAccount from "../pages/OutstandingAccount";
import OutstandingCash from "../pages/OutstandingCash";
import OutstandingGpay from "../pages/OutstandingGpay";
import PriceList from "../pages/PriceList";
import QuotationEntry from "../pages/QuotationEntry";
import QuotationList from "../pages/QuotationList";
import {
  ADMINLIST,
  DASHBOARD,
  DEBTLIST,
  GSTDELIVERYSLIP,
  GSTENTRY,
  GSTEXPENSEENTRY,
  GSTEXPENSELIST,
  GSTSALESLIST,
  LOCALENTRY,
  LOCALEXPENSEAPPROVE,
  LOCALEXPENSEENTRY,
  LOCALEXPENSELIST,
  LOCALLIST,
  LOCALPAIDLIST,
  LOCALPARTYLIST,
  LOCALPENDINGLIST,
  LOGIN,
  OUTSTANDINGACCOUNT,
  OUTSTANDINGCASH,
  OUTSTANDINGGPAY,
  PRICELIST,
  QUOTATIONENTRY,
  QUOTATIONLIST,
} from "./paths";

const routes = [
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: DASHBOARD,
    element: <Dashboard />,
  },

  {
    path: LOCALENTRY,
    element: <LocalEntry />,
  },
  {
    path: LOCALLIST,
    element: <LocalList />,
  },
  {
    path: LOCALPAIDLIST,
    element: <LocalPaidList />,
  },
  {
    path: LOCALPENDINGLIST,
    element: <LocalPendingList />,
  },
  {
    path: LOCALPARTYLIST,
    element: <LocalPartyList />,
  },
  {
    path: LOCALEXPENSEENTRY,
    element: <LocalExpenseEntry />,
  },
  {
    path: LOCALEXPENSELIST,
    element: <LocalExpenseList />,
  },
  {
    path: LOCALEXPENSEAPPROVE,
    element: <LocalExpenseApprove />,
  },
  {
    path: GSTENTRY,
    element: <GstEntry />,
  },
  {
    path: GSTSALESLIST,
    element: <GstSalesList />,
  },
  {
    path: GSTDELIVERYSLIP,
    element: <GstDeliverySlip />,
  },
  {
    path: GSTEXPENSEENTRY,
    element: <GstExpenseEntry />,
  },
  {
    path: GSTEXPENSELIST,
    element: <GstExpenseList />,
  },

  {
    path: ADMINLIST,
    element: <AdminList />,
  },

  {
    path: DEBTLIST,
    element: <DebtList />,
  },
  {
    path: QUOTATIONENTRY,
    element: <QuotationEntry />,
  },
  {
    path: QUOTATIONLIST,
    element: <QuotationList />,
  },
  {
    path: OUTSTANDINGACCOUNT,
    element: <OutstandingAccount />,
  },
  {
    path: OUTSTANDINGCASH,
    element: <OutstandingCash />,
  },
  {
    path: OUTSTANDINGGPAY,
    element: <OutstandingGpay />,
  },
  {
    path: PRICELIST,
    element: <PriceList />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export { routes };
