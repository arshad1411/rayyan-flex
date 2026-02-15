import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/rayyanflexlogo.png";
import { appConfig } from "../../config/appConfig";
import { useAuth } from "../../context/auth-context";
import { ArrowDownIcon, HamburgerIcon, LogoutIcon } from "../icons";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { role, logout } = useAuth();

  const Navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const isActive = (path) => pathname.startsWith(path);

  const toggleMenu = (key) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const filteredMenu = useMemo(() => {
    return appConfig
      .filter((item) => item.roles.includes(role))
      .map((item) => {
        if (item.type === "submenu") {
          return {
            ...item,
            children: item.children.filter((child) =>
              child.roles.includes(role),
            ),
          };
        }
        return item;
      });
  }, [role]);

  useEffect(() => {
    filteredMenu.forEach((menu) => {
      if (menu.type === "submenu") {
        const isChildActive = menu.children.some((child) =>
          pathname.startsWith(child.path),
        );
        if (isChildActive) setOpenMenu(menu.key);
      }
    });
  }, [pathname, filteredMenu]);

  const handleLogout = () => {
    logout();
    Navigate("/");
  };

  const MenuItem = ({ icon, label, path }) => {
    const Icon = icon;

    return (
      <Link
        to={path}
        className={`flex items-center gap-4 px-3 py-2 rounded-full text-white text-lg font-medium transition-all duration-200
        ${collapsed ? "justify-center" : ""}
        ${isActive(path) ? "bg-[#9E77D2]" : "hover:bg-[#9E77D2]"}`}
      >
        <Icon />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  const SubMenu = ({ menu }) => {
    const Icon = menu.icon;
    const isOpen = openMenu === menu.key;

    return (
      <>
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer"
          onClick={() => toggleMenu(menu.key)}
        >
          <div className="flex items-center gap-4 text-white text-lg font-medium">
            <Icon />
            {!collapsed && <span>{menu.label}</span>}
          </div>
          {!collapsed && (
            <ArrowDownIcon className={isOpen ? "rotate-180" : ""} />
          )}
        </div>

        {isOpen && (
          <div className={`flex flex-col gap-1 ${collapsed ? "" : "ml-6"}`}>
            {menu.children.map((child) => (
              <MenuItem key={child.path} {...child} />
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
      <div className="flex justify-between items-center">
        {!collapsed && <img src={Logo} width={120} alt="Logo" />}
        <div
          className="cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <HamburgerIcon />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1">
        {filteredMenu.map((menu) =>
          menu.type === "link" ? (
            <MenuItem key={menu.path} {...menu} />
          ) : (
            <SubMenu key={menu.key} menu={menu} />
          ),
        )}
      </div>
      <div className="absolute bottom-5">
        <button
          className={`${
            collapsed ? "w-[50px] justify-center" : "w-[210px]"
          } bg-[#2D2D35] text-white text-lg  py-3 px-4 rounded-full flex items-center gap-2 hover:bg-[#9E77D2] focus:bg-[#9E77D2]`}
          onClick={handleLogout}
        >
          <LogoutIcon /> {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
