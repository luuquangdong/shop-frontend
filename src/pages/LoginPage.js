import { makeStyles } from "@material-ui/core";
import LoginForm from "components/LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LoginForm successPath="/" />
    </div>
  );
}
