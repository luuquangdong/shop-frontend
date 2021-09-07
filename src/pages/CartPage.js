import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeAmount, removeFromCart } from "redux/cartSlice";
import { number2VNCurrency } from "utils/common";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    borderBottom: "1px #888 solid",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  item: {
    borderBottom: "1px #888 solid",
    padding: "5px 0",
  },
  deleteBtn: {
    border: "none",
    cursor: "pointer",
    padding: "2px 6px",
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#ddd",
    },
    "&:active": {
      backgroundColor: "#bbb",
    },
  },
  bottom: {
    marginTop: theme.spacing(1),
  },
  totalPrice: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  payBtn: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  btn: {
    width: 28,
    fontSize: "1rem",
    textAlign: "center",
    borderRadius: "0 !important",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ccc",
    },
    "&:active": {
      backgroundColor: "#bbb",
    },
  },
  count: {
    padding: "0 4px",
    width: 32,
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    borderLeft: "1px solid #ccc",
    borderRight: "1px solid #ccc",
  },
}));

export default function CartPage() {
  const classes = useStyles();
  const { items } = useSelector((state) => state.cart);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemoveBtnClick = (index) => {
    dispatch(removeFromCart(index));
  };

  const handlePaymentBtnClick = () => {
    if (items.length === 0) return setError("Chưa có sản phẩm");
    history.push("/payment");
  };

  const handleChangeAmount = (index, value) => {
    console.log("click", index, value);
    dispatch(changeAmount({ index, value }));
  };

  return (
    <>
      <div style={{ fontSize: "2rem" }}>Giỏ hàng của bạn</div>
      <hr />
      <br />
      <Paper className={classes.wrapper}>
        <div className={classes.title}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              SẢN PHẨM
            </Grid>
            <Grid item xs={12} sm={3}>
              LOẠI SẢN PHẨM
            </Grid>
            <Grid item xs={12} sm={3}>
              SỐ LƯỢNG
            </Grid>
            <Grid item xs={12} sm={1}>
              GIÁ
            </Grid>
            <Grid item xs={12} sm={1}>
              HÀNH ĐỘNG
            </Grid>
          </Grid>
        </div>
        {items.map((item, index) => (
          <Grid container className={classes.item} key={item.productId}>
            <Grid item xs={12} sm={4}>
              {item.productName}
            </Grid>
            <Grid item xs={12} sm={3}>
              {`size ${item.size}, màu ${item.color}`}
            </Grid>
            <Grid item xs={12} sm={3}>
              <Grid container>
                <button
                  className={classes.btn}
                  onClick={handleChangeAmount.bind(
                    null,
                    index,
                    item.amount + 1
                  )}
                  disabled={item.amount === item.maxAmount}
                >
                  +
                </button>
                <div className={classes.count}>{item.amount}</div>
                <button
                  className={classes.btn}
                  disabled={item.amount === 1}
                  onClick={handleChangeAmount.bind(
                    null,
                    index,
                    item.amount - 1
                  )}
                >
                  -
                </button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={1}>
              {number2VNCurrency(item.amount * item.price)}
            </Grid>
            <Grid item xs={12} sm={1}>
              <button
                className={classes.deleteBtn}
                onClick={handleRemoveBtnClick.bind(null, index)}
              >
                XÓA
              </button>
            </Grid>
          </Grid>
        ))}
        <FormHelperText error>{error}</FormHelperText>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          className={classes.bottom}
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.totalPrice}>
              Tổng tiền:{" "}
              {number2VNCurrency(
                items.reduce((sum, item) => sum + item.price * item.amount, 0)
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                className={classes.payBtn}
                onClick={handlePaymentBtnClick}
              >
                Thanh Toán
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
