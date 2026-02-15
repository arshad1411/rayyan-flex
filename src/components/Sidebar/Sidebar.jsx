import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/rayyanflexlogo.png";

import {
  AdminIcon,
  ApproveListIcon,
  ArrowDownIcon,
  DashboardIcon,
  DeliveryIcon,
  EntryIcon,
  GstExpenseIcon,
  GstSalesIcon,
  HamburgerIcon,
  ListIcon,
  LocalExpenseIcon,
  LocalSalesIcon,
  MoneyExpenseIcon,
  PartyIcon,
  PendingIcon,
  PriceListIcon,
  QuotationIcon,
} from "../icons";

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
  PRICELIST,
  QUOTATIONENTRY,
  QUOTATIONLIST,
} from "../../router/paths";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const isActive = (path) => pathname.startsWith(path);

  const toggleMenu = (key) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  // -------- MENU CONFIG --------
  const menuConfig = useMemo(
    () => [
      {
        type: "link",
        label: "Dashboard",
        icon: <DashboardIcon />,
        path: DASHBOARD,
      },
      {
        type: "submenu",
        key: "local",
        label: "Local Sales",
        icon: <LocalSalesIcon />,
        items: [
          { label: "Entry", icon: <EntryIcon />, path: LOCALENTRY },
          { label: "List", icon: <ListIcon />, path: LOCALLIST },
          {
            label: "Approved List",
            icon: <ApproveListIcon />,
            path: LOCALPAIDLIST,
          },
          {
            label: "Pending List",
            icon: <PendingIcon />,
            path: LOCALPENDINGLIST,
          },
          { label: "Party List", icon: <PartyIcon />, path: LOCALPARTYLIST },
        ],
      },
      {
        type: "submenu",
        key: "localExpense",
        label: "Local Expense",
        icon: <LocalExpenseIcon />,
        items: [
          { label: "Entry", icon: <EntryIcon />, path: LOCALEXPENSEENTRY },
          { label: "List", icon: <ListIcon />, path: LOCALEXPENSELIST },
          {
            label: "Approved List",
            icon: <ApproveListIcon />,
            path: LOCALEXPENSEAPPROVE,
          },
        ],
      },
      {
        type: "submenu",
        key: "gstsales",
        label: "GST Sales",
        icon: <GstSalesIcon />,
        items: [
          { label: "Entry", icon: <EntryIcon />, path: GSTENTRY },
          { label: "List", icon: <ListIcon />, path: GSTSALESLIST },
          {
            label: "Delivery Slip",
            icon: <DeliveryIcon />,
            path: GSTDELIVERYSLIP,
          },
        ],
      },
      {
        type: "submenu",
        key: "gstExpense",
        label: "GST Expense",
        icon: <GstExpenseIcon />,
        items: [
          { label: "Entry", icon: <EntryIcon />, path: GSTEXPENSEENTRY },
          { label: "List", icon: <ListIcon />, path: GSTEXPENSELIST },
        ],
      },
      {
        type: "link",
        label: "Admin",
        icon: <AdminIcon />,
        path: ADMINLIST,
      },
      {
        type: "link",
        label: "Debt",
        icon: <MoneyExpenseIcon />,
        path: DEBTLIST,
      },
      {
        type: "submenu",
        key: "quotation",
        label: "Quotation",
        icon: <QuotationIcon />,
        items: [
          { label: "Entry", icon: <EntryIcon />, path: QUOTATIONENTRY },
          { label: "List", icon: <ListIcon />, path: QUOTATIONLIST },
        ],
      },
      {
        type: "link",
        label: "Price List",
        icon: <PriceListIcon />,
        path: PRICELIST,
      },
    ],
    [],
  );

  // Auto open submenu on route change
  useEffect(() => {
    menuConfig.forEach((menu) => {
      if (menu.type === "submenu") {
        const isChildActive = menu.items.some((item) =>
          pathname.startsWith(item.path),
        );
        if (isChildActive) setOpenMenu(menu.key);
      }
    });
  }, [pathname, menuConfig]);

  // -------- COMPONENTS --------
  const MenuItem = ({ icon, label, path }) => (
    <Link
      to={path}
      className={`flex items-center gap-4 px-3 py-2 rounded-full text-white text-lg font-semibold transition-all duration-200
        ${collapsed ? "justify-center" : ""}
        ${isActive(path) ? "bg-[#9E77D2]" : "hover:bg-[#9E77D2]"}`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  const SubMenu = ({ menu }) => {
    const isOpen = openMenu === menu.key;

    return (
      <>
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer"
          onClick={() => toggleMenu(menu.key)}
        >
          <div className="flex items-center gap-4 text-white text-lg font-semibold">
            {menu.icon}
            {!collapsed && <span>{menu.label}</span>}
          </div>
          {!collapsed && (
            <ArrowDownIcon className={isOpen ? "rotate-180" : ""} />
          )}
        </div>

        {isOpen && (
          <div className={`flex flex-col gap-1 ${collapsed ? "" : "ml-6"}`}>
            {menu.items.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className={`h-[98vh] p-5 bg-[#24252B] m-2 rounded-xl transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        {!collapsed && <img src={Logo} width={120} alt="RayyanFlex Logo" />}
        <div
          className="cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <HamburgerIcon />
        </div>
      </div>

      {/* Menu */}
      <div className="mt-6 flex flex-col gap-2">
        {menuConfig.map((menu) =>
          menu.type === "link" ? (
            <MenuItem key={menu.path} {...menu} />
          ) : (
            <SubMenu key={menu.key} menu={menu} />
          ),
        )}
      </div>
    </div>
  );
};

export default Sidebar;
