import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: theme.spacing(2),
    fontSize: "1rem",
    fontWeight: "bold",
  },
}));

export default function NotFoundPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>404 not found</div>
    </div>
  );
}
