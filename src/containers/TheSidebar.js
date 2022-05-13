import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation, { customerNav } from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.global.sidebarShow);
  const role = useSelector((state) => state.auth.roles);
  const [nav, setNav] = useState([]);
  useEffect(() => {
    switch (role) {
      case "Customer":
        return setNav(customerNav);
      case "Technician":
        return setNav(customerNav);
      case "Staff":
        return setNav(customerNav);
      case "Chief":
        return setNav(customerNav);
    }
  }, []);
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <h3 className="d-xs-hidden">SIG</h3>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
