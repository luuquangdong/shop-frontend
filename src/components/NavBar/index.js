import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1rem",
    listStyleType: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    "& li": {
      float: "left",
    },
    "& a": {
      display: "inline-block",
      color: "white",
      textAlign: "center",
      textDecoration: "none",
      padding: "14px 16px",
      borderRadius: 3,
      transition: "background-color 0.3s ease-out",
    },
    "& a:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "& a:active": {
      textDecoration: "underline",
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

function Navbar(props) {
  const { data } = props;

  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {data.map((item) => {
        if (item.subItems) {
          return (
            <Dropdown
              items={item.subItems}
              title={item.title}
              path={item.path}
              key={item.path}
            />
          );
        }
        return (
          <li key={item.path}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

Navbar.propTypes = {
  data: PropTypes.array,
};

Navbar.defaultProps = {
  data: [],
};

export default React.memo(Navbar);
