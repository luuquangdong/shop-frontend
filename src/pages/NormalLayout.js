import { Container, makeStyles } from "@material-ui/core";
import Footer from "components/Footer";
import Header from "containers/HeaderContainer";
import React from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    minHeight: "68vh",
    backgroundColor: "#EEE",
    paddingBottom: theme.spacing(2),
  },
  nopadding: {
    padding: 0,
    maxWidth: 1100,
  },
}));

function NormalLayout({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <Container className={classes.nopadding}>{children}</Container>
      </div>
      <Footer />
    </div>
  );
}

export default NormalLayout;
