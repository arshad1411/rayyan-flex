import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/rayyanflexlogo.png";
import HamburgerIcon from "../icons/HamburgerIcon";
import DashboardIcon from "../icons/DashboardIcon";
import LocalSalesIcon from "../icons/LocalSalesIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import QuotationIcon from "../icons/QuotationIcon";
import ListIcon from "../icons/ListIcon";
import PendingIcon from "../icons/PendingIcon";
import PartyIcon from "../icons/PartyIcon";
import EntryIcon from "../icons/EntryIcon";

import GstSalesIcon from "../icons/GstSalesIcon";
import GstExpenseIcon from "../icons/GstExpenseIcon";
import AdminIcon from "../icons/AdminIcon";
import DeliveryIcon from "../icons/DeliveryIcon";
import MoneyExpenseIcon from "../icons/MoneyExpenseIcon";
import ApproveListIcon from "../icons/ApproveIcon";
import { LocalExpenseIcon } from "../icons";
import PriceListIcon from "../icons/PriceListIcon";
import {
  ADMINLIST,
  LOCALENTRY,
  LOCALPAIDLIST,
  LOCALPENDINGLIST,
  LOCALLIST,
  LOCALPARTYLIST,
  LOCALEXPENSEENTRY,
  LOCALEXPENSELIST,
  LOCALEXPENSEAPPROVE,
  GSTENTRY,
  GSTDELIVERYSLIP,
  GSTEXPENSELIST,
  GSTSALESLIST,
  GSTEXPENSEENTRY,
  DEBTLIST,
  QUOTATIONENTRY,
  QUOTATIONLIST,
  DASHBOARD,
  PRICELIST,
} from "../../router/paths";

const Sidebar = () => {
  const location = useLocation();

  const pathname = location.pathname;
  const [openSubmenu, setOpenSubmenu] = useState({
    chart: false,
    local: false,
    localExpense: false,
    gstsales: false,
    gstExpense: false,
    admin: false,
    quotation: false,
    outstanding: false,
  });
  const [hamburger, setHamburger] = useState(false);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu((prevState) => ({
      ...Object.fromEntries(Object.keys(prevState).map((key) => [key, false])),
      [menu]: !prevState[menu],
    }));
  };

  const isActive = (to) => pathname?.startsWith(to);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenSubmenu((prevState) => {
      const updatedState = { ...prevState };
      const submenuPaths = {
        chart: ["/chartoverview", "/chartparticular"],
        local: [
          "/localentry",
          "/locallist",
          "/localpaidlist",
          "/localpendinglist",
          "/localpartylist",
        ],
        localExpense: [
          "/localexpenseentry",
          "/localexpenselist",
          "/localexpenseapprove",
        ],
        gstsales: ["/gstsalesentry", "/gstsaleslist", "/gstsalesdelivery"],
        gstExpense: ["/gstexpenseentry", "/gstexpenselist"],
        admin: ["/adminlist"],
        debt: ["/debtlist"],
        quotation: ["/quotationentry", "/quotationlist"],
        outstanding: [
          "/outstandingaccount",
          "/outstandingcash",
          "/outstandinggpay",
        ],
      };

      Object.keys(updatedState).forEach((menu) => {
        updatedState[menu] =
          submenuPaths[menu]?.some((path) => pathname === path) || false;
      });

      return updatedState;
    });
  }, [pathname]);

  const toggleHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <div
      className={`h-[98vh]  p-5 bg-[#24252B] m-2 rounded-xl relative ${
        hamburger ? "w-30" : "w-62.5"
      }`}
    >
      <div className="flex justify-between items-center">
        <img
          src={Logo}
          width={120}
          height={50}
          alt="rayyanflex"
          background
          color="#24252B"
        />

        <div className="cursor-pointer" onClick={toggleHamburger}>
          <HamburgerIcon />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        (
        <>
          <Link
            to={DASHBOARD}
            className={`flex items-center gap-4 px-3 py-2 font-semibold text-white text-[20px] hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
              hamburger ? "justify-center" : ""
            } ${isActive(DASHBOARD) ? " bg-[#9E77D2]" : ""}`}
          >
            <DashboardIcon /> {!hamburger && "Dashboard"}
          </Link>
        </>
        )
        <div
          className="flex items-center px-3 py-2 justify-between cursor-pointer"
          onClick={() => toggleSubmenu("local")}
        >
          <div className="flex items-center">
            <LocalSalesIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-white text-[20px] font-semibold ">
                Local Sales
              </p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.local ? "rotate-180" : ""}`}
          />
        </div>
        {openSubmenu.local && (
          <div className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}>
            <Link
              to={LOCALENTRY}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(LOCALENTRY) ? " bg-[#9E77D2]" : ""}`}
            >
              <EntryIcon />
              {!hamburger && <span>Entry</span>}
            </Link>
            <Link
              to={LOCALLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(LOCALLIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <ListIcon />
              {!hamburger && <span>List</span>}
            </Link>
            {
              <Link
                to={LOCALPAIDLIST}
                className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                  hamburger && "justify-center"
                }${isActive(LOCALPAIDLIST) ? " bg-[#9E77D2]" : ""}`}
              >
                <ApproveListIcon />
                {!hamburger && <span>Approved List</span>}
              </Link>
            }
            <Link
              to={LOCALPENDINGLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(LOCALPENDINGLIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <PendingIcon />
              {!hamburger && <span>Pending List</span>}
            </Link>
            <Link
              to={LOCALPARTYLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(LOCALPARTYLIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <PartyIcon />
              {!hamburger && <span>Party List</span>}
            </Link>
          </div>
        )}
        <div
          className="flex items-center px-3 py-2 justify-between cursor-pointer"
          onClick={() => toggleSubmenu("localExpense")}
        >
          <div className="flex items-center">
            <LocalExpenseIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-[20px] font-semibold text-white text-lg ">
                Local Expense
              </p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.localExpense ? "rotate-180" : ""}`}
          />
        </div>
        {openSubmenu.localExpense && (
          <div className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}>
            <Link
              to={LOCALEXPENSEENTRY}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(LOCALEXPENSEENTRY) ? " bg-[#9E77D2]" : ""}`}
            >
              <EntryIcon />
              {!hamburger && <span>Entry</span>}
            </Link>
            <Link
              to={LOCALEXPENSELIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(LOCALEXPENSELIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <ListIcon />
              {!hamburger && <span>List</span>}
            </Link>
            {
              <Link
                to={LOCALEXPENSEAPPROVE}
                className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                  hamburger && "justify-center"
                }${isActive(LOCALEXPENSEAPPROVE) ? " bg-[#9E77D2]" : ""}`}
              >
                <ApproveListIcon />
                {!hamburger && <span>Approved List</span>}
              </Link>
            }
          </div>
        )}
        <div
          className="flex items-center px-3 py-2 text-[20px] font-semibold  justify-between cursor-pointer"
          onClick={() => toggleSubmenu("gstsales")}
        >
          <div className="flex items-center">
            <GstSalesIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-[20px] font-semibold  text-white ">
                Gst Sales
              </p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.gstsales ? "rotate-180" : ""}`}
          />
        </div>
        {openSubmenu.gstsales && (
          <div className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}>
            <Link
              to={GSTENTRY}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold  hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(GSTENTRY) ? " bg-[#9E77D2]" : ""}`}
            >
              <EntryIcon />
              {!hamburger && <span>Entry</span>}
            </Link>
            <Link
              to={GSTSALESLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold  hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(GSTSALESLIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <ListIcon />
              {!hamburger && <span>List</span>}
            </Link>
            <Link
              to={GSTDELIVERYSLIP}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold  hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(GSTDELIVERYSLIP) ? " bg-[#9E77D2]" : ""}`}
            >
              <DeliveryIcon />
              {!hamburger && <span>Delivery Slip</span>}
            </Link>
          </div>
        )}
        <div
          className="flex items-center px-3 py-2 justify-between cursor-pointer"
          onClick={() => toggleSubmenu("gstExpense")}
        >
          <div className="flex items-center">
            <GstExpenseIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-white text-[20px] font-semibold  ">
                Gst Expense
              </p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.gstExpense ? "rotate-180" : ""}`}
          />
        </div>
        {openSubmenu.gstExpense && (
          <div className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}>
            <Link
              to={GSTEXPENSEENTRY}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold  hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(GSTEXPENSEENTRY) ? " bg-[#9E77D2]" : ""}`}
            >
              <EntryIcon />
              {!hamburger && <span>Entry</span>}
            </Link>
            <Link
              to={GSTEXPENSELIST}
              className={`flex items-center gap-4 px-3 py-2 text-white  text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(GSTEXPENSELIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <ListIcon />
              {!hamburger && <span>List</span>}
            </Link>
          </div>
        )}
        {
          <>
            <Link
              to={ADMINLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                isActive(ADMINLIST) ? " bg-[#9E77D2]" : ""
              }`}
            >
              <AdminIcon /> {!hamburger && "Admin"}
            </Link>

            <Link
              to={DEBTLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                isActive(DEBTLIST) ? " bg-[#9E77D2]" : ""
              }`}
            >
              <MoneyExpenseIcon color="#fff" /> {!hamburger && "Debt"}
            </Link>
          </>
        }
        <div
          className="flex items-center px-3 py-2 justify-between  text-[20px]font-semibold  cursor-pointer"
          onClick={() => toggleSubmenu("quotation")}
        >
          <div className="flex items-center">
            <QuotationIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-white text-[20px] font-semibold">
                Quotation
              </p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.quotation ? "rotate-180" : ""}`}
          />
        </div>
        {openSubmenu.quotation && (
          <div className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}>
            <Link
              to={QUOTATIONENTRY}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(QUOTATIONENTRY) ? " bg-[#9E77D2]" : ""}`}
            >
              <EntryIcon />
              {!hamburger && <span>Entry</span>}
            </Link>
            <Link
              to={QUOTATIONLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(QUOTATIONLIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <ListIcon />
              {!hamburger && <span>List</span>}
            </Link>
          </div>
        )}
        <div
          className={`flex items-center gap-4 px-3 py-2 text-white text-[20px] font-semibold hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
            isActive(PRICELIST) ? " bg-[#9E77D2]" : ""
          }`}
        >
          <PriceListIcon /> {!hamburger && "PriceList"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
