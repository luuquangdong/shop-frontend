import { makeStyles } from "@material-ui/core";
import LoginForm from "components/LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function AdminLogIn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoginForm successPath="/admin/dashboard" />
    </div>
  );
}
