import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  FormHelperText,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import { BASE_URL2 } from "apis/base";
import { useDispatch } from "react-redux";
import { logInSuccess } from "redux/authSlice";
import { setRole } from "redux/roleSlice";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    width: "100%",
    padding: theme.spacing(3),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  signUpLink: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Tên đăng nhập phải ít nhất 4 kí tự")
    .required(),
  password: yup.string().min(5, "Mật khẩu phải ít nhất 5 kí tự").required(),
});

function LoginForm(props) {
  const { successPath } = props;
  const classes = useStyles();
  const [err, setErr] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    formSchema
      .validate(values)
      .then(async (data) => {
        setErr("");
        try {
          const res = await axios.post(`${BASE_URL2}/login`, data);
          // console.log(res);
          const role = res.data.role.replace("ROLE_", "");
          const token = res.headers.authorization.replace("Bearer ", "");
          dispatch(setRole(role));
          dispatch(logInSuccess(token));
          // console.log({ role, token });
          history.push(successPath);
        } catch (e) {
          console.log({ e });
          setErr("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
      })
      .catch((e) => {
        console.log(e.message);
        setErr(e.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  const { getFieldProps } = formik;

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Paper elevation={3} className={classes.wrapper}>
        <form onSubmit={formik.handleSubmit}>
          <h2>ĐĂNG NHẬP</h2>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            variant="outlined"
            size="small"
            name="usename"
            {...getFieldProps("username")}
          />
          <div className={classes.margin} />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="outlined"
            size="small"
            name="password"
            {...getFieldProps("password")}
          />
          <div className={classes.margin} />
          <FormHelperText error>{err}</FormHelperText>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Đăng nhập
          </Button>
        </form>
        <div className={classes.signUpLink}>
          <Link to="/signup">Chưa có tài khoản, đăng ký</Link>
        </div>
      </Paper>
    </Container>
  );
}

LoginForm.propTypes = {
  successPath: PropTypes.string.isRequired,
};

export default LoginForm;
