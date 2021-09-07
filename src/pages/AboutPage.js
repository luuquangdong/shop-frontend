import React from "react";
import {
  Button,
  Grid,
  Paper,
  makeStyles,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
  },
  wrapper: {
    padding: theme.spacing(2),
  },
  space: {
    marginTop: theme.spacing(2),
  },
  info: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
}));

export default function AboutPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Liện hệ</div>
      <Divider />
      <br />
      <Paper className={classes.wrapper}>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <div className={classes.info}>
              <Typography>Phone: 0123 456 789</Typography>
              <Typography>Email: mail@mail.com</Typography>
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div>
              <TextField label="Họ tên" fullWidth variant="outlined" />
              <div className={classes.space} />
              <TextField label="Email" fullWidth variant="outlined" />
              <div className={classes.space} />
              <TextField label="Tin nhắn" fullWidth variant="outlined" />
              <div className={classes.space} />
              <Button fullWidth variant="contained" color="primary">
                Gửi
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
