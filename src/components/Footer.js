import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    backgroundColor: "#D4D2D5",
  },
});

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <address>Developed by Luu Quang Dong</address>
    </footer>
  );
}
