import React from "react";
import Menu from "components/Menu";
import {
  CalendarViewDay,
  Dashboard,
  SupervisorAccount,
  AccountBox,
  Apps,
  Ballot,
  Stop,
} from "@material-ui/icons";

const menuConfig = [
  {
    type: "single",
    title: "Dashboard",
    header: "Dashboard",
    icon: Dashboard,
    path: "/dashboard",
  },
  {
    type: "divider",
  },
  {
    type: "list",
    title: "Quản lý sản phẩm",
    header: "Quản lý sản phẩm",
    icon: Apps,
    path: "/products",
    items: [
      {
        title: "Danh sách sản phẩm",
        header: "Quản lý sản phẩm",
        icon: CalendarViewDay,
        path: "/all",
      },
    ],
  },
  {
    type: "list",
    title: "Quản lý đơn hàng",
    header: "Quản lý đơn hàng",
    path: "/orders",
    icon: Stop,
    items: [
      {
        title: "Danh sách đơn hàng",
        header: "Danh sách đơn hàng",
        icon: Ballot,
        path: "/all",
      },
    ],
  },
  {
    type: "list",
    title: "Quản lý tài khoản",
    header: "Quản lý tài khoản",
    path: "/accounts",
    icon: AccountBox,
    items: [
      {
        title: "Danh sách tài khoản",
        header: "Danh sách tài khoản",
        icon: SupervisorAccount,
        path: "/all",
      },
    ],
  },
];

const path2Header = () => {
  const result = {};
  for (const item of menuConfig) {
    if (item.type === "single") {
      result[`/admin${item.path}`] = item.header;
    } else if (item.type === "list") {
      for (const sub of item.items) {
        result[`/admin${item.path}${sub.path}`] = sub.header;
      }
    }
  }
  return result;
};

const pathToHeader = path2Header();

export { pathToHeader };

export default function MenuContainer() {
  return <Menu data={menuConfig} />;
}
