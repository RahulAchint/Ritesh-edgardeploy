import React from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarItems from "../SidebarItems";
// import "../../style/Public.css";
import ArrowRight from "../../assets/arrowRight.png";
import LogoutIcon from "../../assets/logoutIcon.png";
import Image from "../../assets/edgarlogoo.png"
import i18n, { t } from "i18next";
import { getAuth, signOut } from "firebase/auth";

function SidebarComponent() {
  const { toggleSidebar } = useProSidebar();
  let location = useLocation();
  let navigate = useNavigate();

  const onLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        alert(error?.message);
        // An error happened.
      });
  };

  const MenuItemComponent = ({ item, index }: { item: any; index: number }) => {
    return (
      <MenuItem
        className={
          location.pathname === item.route ? "activeClass" : "menuItem"
        }
        onClick={() => navigate(item.route)}
        key={index}
      >
        <img src={item.icon} alt="" className="icon" width={22} height={22} />
        {t(item.name)}
        {location.pathname === item.route ? (
          <img src={ArrowRight} alt="" className="activeIcon ms-4" />
        ) : (
          ""
        )}
      </MenuItem>
    );
  };
  return (
    <div style={{ display: "flex", height: "100%" }} className="min-vh-100">
      <div
        className={`${i18n.language === "he" ? "sidebarRtl" : "sidebarLtr"}`}
      >
        <i
          className="fa fa-bars bars"
          onClick={() => toggleSidebar()}
          aria-hidden="true"
        ></i>

        <Sidebar className="text-center" breakPoint="md">
          <Menu>
            <img src={Image} alt="" width={35} height={35} className="my-5" />
            <div className="userNameMain">
              <div className="d-flex adminView">
                <p className="admin me-3">
                  {localStorage.getItem("user") !== null
                    ? (
                        JSON.parse(localStorage.getItem("user") ?? "")
                          ?.displayName ?? "Admin"
                      ).slice(0, 1)
                    : "Admin".slice(0, 1)}
                </p>
                {/* <div className="mx-3 userNameContainer align-center justify-center"> */}
                <h4 className="admin-heading pt-1">
                  {localStorage.getItem("user") !== null
                    ? JSON.parse(localStorage.getItem("user") ?? "")
                        ?.displayName ?? "Admin"
                    : "Admin"}
                </h4>
                {/* <p>{localStorage.getItem("subRole")} level Admin</p> */}
              </div>
            </div>
            {/* </div> */}
            {SidebarItems.AdminItems.map((item, index) => {
              return <MenuItemComponent item={item} index={index} />;
            })}
            <MenuItem
              className={`logoutButton ${
                i18n.language === "he" && "logoutButtonHe"
              }`}
              onClick={onLogout}
            >
              <img src={LogoutIcon} alt="" className="me-1" />
              {t("Logout")}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}

export default SidebarComponent;
