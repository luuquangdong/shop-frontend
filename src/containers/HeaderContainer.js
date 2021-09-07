import React from "react";
import Header from "components/Header";
import { useHistory } from "react-router-dom";

const navbarConfig = [
  { title: "Trang chủ", path: "/" },
  {
    title: "Sản phẩm",
    path: "/product",
    subItems: [
      { title: "Bán chạy", path: "/product/hot" },
      { title: "Mới", path: "/product/new" },
      { title: "Giảm giá", path: "/product/discount" },
    ],
  },
  { title: "Liên hệ", path: "/about" },
];

export default function HeaderContainer() {
  const history = useHistory();

  const handleSearchSubmit = (text) => {
    console.log(text);
  };

  const handleLoginClick = () => history.push("/login");

  const handleCartClick = () => history.push("/cart");

  return (
    <Header
      brandName="My Shop"
      navbarData={navbarConfig}
      handleSearchSubmit={handleSearchSubmit}
      handleLoginClick={handleLoginClick}
      handleCartClick={handleCartClick}
    />
  );
}
