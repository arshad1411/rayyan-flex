import {
  ADMINLIST,
  DASHBOARD,
  DEBTLIST,
  LOCALENTRY,
  LOCALLIST,
  LOCALPAIDLIST,
  LOCALPARTYLIST,
  LOCALPENDINGLIST,
  PRICELIST,
  QUOTATIONENTRY,
  QUOTATIONLIST,
} from "../router/paths";

export const appMenu = [
  {
    type: "link",
    label: "Dashboard",
    path: DASHBOARD,
    icon: "DashboardIcon",
    roles: ["admin", "authenticated"],
  },
  {
    type: "submenu",
    key: "local",
    label: "Local Sales",
    icon: "LocalSalesIcon",
    roles: ["admin", "authenticated"],
    items: [
      { label: "Entry", path: LOCALENTRY, roles: ["admin", "authenticated"] },
      { label: "List", path: LOCALLIST, roles: ["admin", "authenticated"] },
      { label: "Approved List", path: LOCALPAIDLIST, roles: ["admin"] },
      {
        label: "Pending List",
        path: LOCALPENDINGLIST,
        roles: ["admin", "authenticated"],
      },
      {
        label: "Party List",
        path: LOCALPARTYLIST,
        roles: ["admin", "authenticated"],
      },
    ],
  },
  {
    type: "link",
    label: "Admin",
    path: ADMINLIST,
    icon: "AdminIcon",
    roles: ["admin"],
  },
  {
    type: "link",
    label: "Debt",
    path: DEBTLIST,
    icon: "MoneyExpenseIcon",
    roles: ["admin"],
  },
  {
    type: "submenu",
    key: "quotation",
    label: "Quotation",
    icon: "QuotationIcon",
    roles: ["admin", "authenticated"],
    items: [
      {
        label: "Entry",
        path: QUOTATIONENTRY,
        roles: ["admin", "authenticated"],
      },
      { label: "List", path: QUOTATIONLIST, roles: ["admin", "authenticated"] },
    ],
  },
  {
    type: "link",
    label: "Price List",
    path: PRICELIST,
    icon: "PriceListIcon",
    roles: ["admin", "authenticated"],
  },
];
