import {
  Grid,
  Paper,
  TextField,
  makeStyles,
  Divider,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import instanceAxios from "apis/base";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "redux/cartSlice";
import { number2VNCurrency } from "utils/common";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  header: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "1rem",
    marginTop: theme.spacing(1),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  payMethod: {
    fontSize: "1rem",
  },
  payBtn: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const paymentSchema = yup.object().shape({
  customerName: yup.string().required("Đây là thông tin bắt buộc"),
  phoneNumber: yup
    .string()
    .matches(/^0\d{9}$/, "Số điện thoại không hợp lệ")
    .required("Đây là thông tin bắt buộc"),
  province: yup.string().required("Đây là thông tin bắt buộc"),
  district: yup.string().required("Đây là thông tin bắt buộc"),
  ward: yup.string().required("Đây là thông tin bắt buộc"),
  extraInfo: yup.string().required("Đây là thông tin bắt buộc"),
  paymentMethod: yup.string().required("Bạn chưa chọn phương thức thanh toán"),
});

export default function PaymentPage() {
  const classes = useStyles();
  const { items } = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      phoneNumber: "",
      province: "",
      district: "",
      ward: "",
      extraInfo: "",
      paymentMethod: "COD",
    },
    onSubmit: async (values, submitProps) => {
      const address = {
        province: values.province,
        district: values.district,
        ward: values.ward,
        detail: values.extraInfo,
      };
      values.address = address;
      values.orderItems = items;
      try {
        const res = await instanceAxios.post("/orders/create", values);
        enqueueSnackbar("Đặt hàng thành công", { variant: "success" });
        submitProps.resetForm();
        dispatch(clearCart());
        console.log(res.data);
      } catch (err) {
        console.log({ err });
      }
    },
    validationSchema: paymentSchema,
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <>
      <div style={{ fontSize: "2rem" }}>Thông tin giao hàng</div>
      <hr />
      <br />
      <Grid container justifyContent="center">
        <Grid item md={8} sm={10} xs={12}>
          <Paper className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
              <div className={classes.header}>Thông tin khách hàng</div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="customerName"
                    name="customerName"
                    label="Họ tên người nhận hàng"
                    variant="outlined"
                    size="small"
                    error={errors.customerName && touched.customerName}
                    helperText={errors.customerName}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.customerName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Số điện thoại"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    error={errors.phoneNumber && touched.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                </Grid>
              </Grid>
              <Divider />
              <div className={classes.header}>Địa chỉ nhận hàng</div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="province"
                    name="province"
                    label="Tỉnh/Thành phố"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.province && touched.province}
                    helperText={errors.province}
                    value={values.province}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="district"
                    name="district"
                    label="Quận/Huyện"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.district && touched.district}
                    helperText={errors.district}
                    value={values.district}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="ward"
                    name="ward"
                    label="Xã/Phường"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.ward && touched.ward}
                    helperText={errors.ward}
                    value={values.ward}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.input}
                    id="extraInfo"
                    name="extraInfo"
                    label="Số nhà, tên đường, ngõ, thôn, xóm..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.extraInfo && touched.extraInfo}
                    helperText={errors.extraInfo}
                    value={values.extraInfo}
                  />
                </Grid>
              </Grid>
              <Divider />
              <div className={classes.header}>Phương thức giao hàng</div>
              <RadioGroup
                aria-label="paymentMethod"
                id="paymentMethod"
                name="paymentMethod"
                value={values.paymentMethod}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="COD"
                  control={<Radio />}
                  label="COD - Thanh toán khi nhận hàng"
                />
              </RadioGroup>
              {errors.paymentMethod && touched.paymentMethod && (
                <FormHelperText error>{errors.paymentMethod}</FormHelperText>
              )}
              <Divider />
              <div className={classes.header}>
                TỔNG TIỀN THANH TOÁN:{" "}
                {number2VNCurrency(
                  items.reduce((sum, item) => sum + item.price * item.amount, 0)
                )}
              </div>
              <Divider />
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.payBtn}
                  type="submit"
                >
                  Xác nhận thanh toán
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
