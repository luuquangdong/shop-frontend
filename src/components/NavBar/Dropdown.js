import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dropDown: {
    display: "inline-block",
  },
  dropdownBtn: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dropDownContent: {
    display: "none",
    fontSize: "0.9rem",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: 160,
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: 1,
    borderRadius: 2,
    "& > a": {
      color: "black",
      display: "block",
      textAlign: "left",
    },
    "$dropDown:hover &": {
      display: "block",
    },
  },
  subLink: {
    color: "black !important",
    display: "block !important",
    textAlign: "left !important",
    "$dropDownContent &:hover": {
      backgroundColor: "#ccc",
    },
  },
}));

function Dropdown(props) {
  const classes = useStyles();
  const { items, title, path } = props;

  return (
    <li className={classes.dropDown}>
      <Link to={path} className={classes.dropdownBtn}>
        {title}
      </Link>
      <div className={classes.dropDownContent}>
        {items.map((item) => (
          <Link to={item.path} key={item.title} className={classes.subLink}>
            {item.title}
          </Link>
        ))}
      </div>
    </li>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Dropdown;
