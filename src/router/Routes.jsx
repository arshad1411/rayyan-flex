import {
  LOGIN,
  DASHBOARD,
  LOCALENTRY,
  LOCALLIST,
  LOCALPAIDLIST,
  LOCALPENDINGLIST,
  LOCALPARTYLIST,
  ADMINLIST,
  LOCALEXPENSEAPPROVE,
  LOCALEXPENSEENTRY,
  LOCALEXPENSELIST,
  GSTENTRY,
  GSTSALESLIST,
  GSTDELIVERYSLIP,
  GSTEXPENSEENTRY,
  GSTEXPENSELIST,
  ADMINENTRY,
  DEBTLIST,
  QUOTATIONENTRY,
  QUOTATIONLIST,
  PRICELIST,
} from "./paths";

import Login from "../pages/Login/page";
import Dashboard from "../pages/Dashboard/page";
import LocalEntry from "../pages/LocalEntry/page";
import LocalList from "../pages/LocalList/page";
import LocalPaidList from "../pages/LocalPaidList/page";
import LocalPending from "../pages/LocalPending/page";
import LocalPartyList from "../pages/LocalPartyList/page";
import AdminEntry from "../pages/AdminList/page";

import LocalExpenseEntry from "../pages/LocalExpensesEntry/page";
import LocalExpenseList from "../pages/LocalExpenseList/page";
import LocalExpenseApprove from "../pages/LocalExpenseApprove/page";
import GstEntry from "../pages/GstEntry/page";
import GstSalesList from "../pages/GstSalesList/page";
import GstDeliverySlip from "../pages/GstDeliverySlip/page";
import GstExpenseEntry from "../pages/GstExpenseEntry/page";
import GstExpenseList from "../pages/GstExpenseList/page";
import DebtList from "../pages/DebtList/page";

import AdminList from "../pages/AdminList/page";
import QuotationEntry from "../pages/QuotationEntry/page";
import QuotationList from "../pages/QuotationList/page";
import PriceList from "../pages/PriceList/page";

export const routes = [
  { path: LOGIN, element: <Login /> },
  { path: DASHBOARD, element: <Dashboard /> },
  { path: LOCALENTRY, element: <LocalEntry /> },
  { path: LOCALLIST, element: <LocalList /> },
  { path: LOCALPAIDLIST, element: <LocalPaidList /> },
  { path: LOCALPENDINGLIST, element: <LocalPending /> },
  { path: LOCALPARTYLIST, element: <LocalPartyList /> },
  { path: ADMINLIST, element: <AdminEntry /> },
  { path: LOCALEXPENSEENTRY, element: <LocalExpenseEntry /> },
  { path: LOCALEXPENSELIST, element: <LocalExpenseList /> },
  { path: LOCALEXPENSEAPPROVE, element: <LocalExpenseApprove /> },
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
    path: ADMINENTRY,
    element: <AdminEntry />,
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
    path: PRICELIST,
    element: <PriceList />,
  },
];
