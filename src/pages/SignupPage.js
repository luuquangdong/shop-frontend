import React, { useState } from "react";
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
import instanceAxios from "apis/base";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  wrapper: {
    width: "100%",
    padding: theme.spacing(3),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
}));

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Tên đăng nhập phải ít nhất 4 kí tự")
    .required("Tên đăng nhập bắt buộc"),
  password: yup
    .string()
    .min(5, "Mật khẩu phải ít nhất 5 kí tự")
    .required("Mật khẩu bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại bắt buộc"),
  fullName: yup.string(),
});

function SignupPage() {
  const classes = useStyles();
  const [err, setErr] = useState();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (values) => {
    formSchema
      .validate(values)
      .then(async (data) => {
        setErr("");
        try {
          const res = await instanceAxios.post("/users/sign-up", data);
          enqueueSnackbar("Đăng ký thành công", { variant: "success" });
          console.log(res);
          history.push("/login");
        } catch (e) {
          console.log({ e });
          setErr(e.response.data.message);
        }
      })
      .catch((e) => {
        console.log({ e });
        setErr(e.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
    },
    onSubmit: handleSubmit,
  });

  const { getFieldProps } = formik;

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Paper elevation={3} className={classes.wrapper}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Đăng ký</h2>
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
            <TextField
              label="Nhập lại mật khẩu"
              type="password"
              fullWidth
              variant="outlined"
              size="small"
              name="confirmPassword"
              {...getFieldProps("confirmPassword")}
            />
            <div className={classes.margin} />
            <TextField
              label="Số điện thoại"
              fullWidth
              variant="outlined"
              size="small"
              name="phoneNumber"
              {...getFieldProps("phoneNumber")}
            />
            <div className={classes.margin} />
            <TextField
              label="Họ tên"
              fullWidth
              variant="outlined"
              size="small"
              name="fullName"
              {...getFieldProps("fullName")}
            />
            <div className={classes.margin} />
            <FormHelperText error>{err}</FormHelperText>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Đăng ký
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default SignupPage;
