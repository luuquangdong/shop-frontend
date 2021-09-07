import React from "react";
import PropTypes from "prop-types";
import { Divider, List, makeStyles } from "@material-ui/core";
import CustomListItem from "./CustomListItem";
import SingleItem from "./SingleItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Menu(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {data.map((item, index) => {
        if (item.type === "single")
          return <SingleItem {...item} key={item.title} />;
        else if (item.type === "list")
          return <CustomListItem {...item} key={item.title} />;
        else return <Divider key={index} />;
      })}
    </List>
  );
}

Menu.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Menu;
