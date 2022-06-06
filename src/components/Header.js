import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Navbar from "./NavBar";
import { Link } from "react-router-dom";
import { Logo5Icon } from "assets/images";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Badge,
} from "@material-ui/core";
import Search from "./Search";
import { useSelector } from "react-redux";
import AccountBtn from "./AccountBtn";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontSize: theme.typography.h1,
      fontWeight: "bold",
      padding: theme.spacing(2),
      color: "inherit",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      transition: "background-color 1s ease-out",
      borderRadius: 16,
      "&:active": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    logo: {
      marginRight: "6px",
    },
    cartIcon: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover": {
        // backgroundColor: "#eee",
        // color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.dark,
      },
    },
    grow: {
      flexGrow: 1,
    },
  })
);

function Header(props) {
  const { brandName, navbarData, handleSearchSubmit, handleCartClick } = props;

  const { items } = useSelector((state) => state.cart);
  console.log(items);

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Logo5Icon fill="white" height={42} myClass={classes.logo} />
          <Typography variant="h5">{brandName}</Typography>
        </Link>
        <div className={classes.grow} />
        <Navbar data={navbarData} />
        <div className={classes.grow} />
        <Search submit={handleSearchSubmit} />
        <IconButton
          className={classes.cartIcon}
          onClick={handleCartClick}
          aria-label="shopping-cart"
        >
          <Badge badgeContent={items?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <AccountBtn />
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  brandName: PropTypes.string.isRequired,
  navbarData: PropTypes.array.isRequired,
};

export default Header;
