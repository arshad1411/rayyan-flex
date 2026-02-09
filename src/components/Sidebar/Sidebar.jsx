import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo2.jpg";
import HamburgerIcon from "../icons/HamburgerIcon";
import DashboardIcon from "../icons/DashboardIcon";
import LocalSalesIcon from "../icons/LocalSalesIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import QuotationIcon from "../icons/QuotationIcon";
import {
  // ADMINENTRY,

  // CHARTOVERIEW,
  // CHARTPARTICULAR,
  DASHBOARD,
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
        hamburger ? "w-[120px]" : "w-[250px]"
      }`}
    >
      <div className="flex justify-between items-center">
        <img src={Logo} width={120} height={50} alt="rayyanflex" />

        <div className="cursor-pointer" onClick={toggleHamburger}>
          <HamburgerIcon />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        (
        <>
          <Link
            to={DASHBOARD}
            className={`flex items-center gap-4 px-3 py-2 text-white text-lg hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
              hamburger ? "justify-center" : ""
            } ${isActive(DASHBOARD) ? " bg-[#9E77D2]" : ""}`}
          >
            <DashboardIcon /> {!hamburger && "Dashboard"}
          </Link>

          {/* <div
              className="flex items-center px-3 py-2 justify-between cursor-pointer"
              onClick={() => toggleSubmenu("chart")}
            >
              <div className="flex items-center">
                <ChartIcon />{" "}
                {!hamburger && (
                  <p className="ml-4 text-white text-lg ">Chart</p>
                )}
              </div>
              <ArrowDownIcon
                className={`${openSubmenu.chart ? "rotate-180" : ""}`}
              />
            </div>

            {openSubmenu.chart && (
              <div
                className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}
              >
                <Link
                  to={CHARTOVERIEW}
                  className={`flex items-center gap-4 px-3 py-2 text-white text-lg hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                    hamburger && "justify-center"
                  }${isActive(CHARTOVERIEW) ? " bg-[#9E77D2]" : ""}`}
                >
                  <ChartOverviewIcon />
                  {!hamburger && <span>Overview</span>}
                </Link>
                <Link
                  to={CHARTPARTICULAR}
                  className={`flex items-center gap-4 px-3 py-2 text-white text-lg hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                    hamburger && "justify-center"
                  }${isActive(CHARTPARTICULAR) ? " bg-[#9E77D2]" : ""}`}
                >
                  <ChartParticular />
                  {!hamburger && <span>Particular</span>}
                </Link>
              </div>
            )} */}
        </>
        )
        <div
          className="flex items-center px-3 py-2 justify-between cursor-pointer"
          onClick={() => toggleSubmenu("local")}
        >
          <div className="flex items-center">
            <LocalSalesIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-white text-lg ">Local Sales</p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.local ? "rotate-180" : ""}`}
          />
        </div>
        {/* {openSubmenu.admin && (
          <div className={`flex flex-col gap-1 ${hamburger ? "ml-0" : "ml-4"}`}>
            <Link
              to={ADMINENTRY}
              className={`flex items-center gap-4 px-3 py-2 text-white text-lg hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(ADMINENTRY) ? " bg-[#9E77D2]" : ""}`}
            >
              <EnteryIcon />
              {!hamburger && <span>Entry</span>}
            </Link>
            <Link
              to={ADMINLIST}
              className={`flex items-center gap-4 px-3 py-2 text-white text-lg hover:bg-[#9E77D2] focus:bg-[#9E77D2] rounded-full  ${
                hamburger && "justify-center"
              }${isActive(ADMINLIST) ? " bg-[#9E77D2]" : ""}`}
            >
              <ListIcon />
              {!hamburger && <span>List</span>}
            </Link>
          </div>
        )} */}
        <div
          className="flex items-center px-3 py-2 justify-between cursor-pointer"
          onClick={() => toggleSubmenu("quotation")}
        >
          <div className="flex items-center">
            <QuotationIcon />{" "}
            {!hamburger && (
              <p className="ml-4 text-white text-lg ">Quotation</p>
            )}
          </div>
          <ArrowDownIcon
            className={`${openSubmenu.quotation ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
