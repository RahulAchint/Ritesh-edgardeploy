import React from 'react'
import { useLocation } from 'react-router-dom';
import Login from '../../pages/login'
import RoutesComponent from '../RoutesComponent'
import SidebarComponent from '../Sidebar/Sidebar'
import i18n from "i18next";

function Layout() {
    let location = useLocation();
  return (
    <>
    {location.pathname === '/' ? <Login/>
    : 
    <div className="layout">
       <SidebarComponent />
      <div className={i18n.language === "he" ? "layoutContentRtl":"layoutContentLtr"}>
      <RoutesComponent />
      </div>
    </div>
    }
    </>
  )
}

export default Layout