import {
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  Zoom,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "redux/cartSlice";
import { number2VNCurrency } from "utils/common";
import MyGroupBtn from "components/MyGroupBtn";
import { Alert } from "@material-ui/lab";
import { fetchProduct } from "apis/productAPI";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  table: {
    width: "100%",
    "& tr > td": {
      padding: "8px 4px",
      fontSize: "1rem",
      color: "#444",
    },
    "& tr > td:first-child": {
      width: "auto",
    },
    "& tr:nth-child(even)": {
      backgroundColor: "#EFEFEF",
    },
  },
  price: {
    fontSize: "1.2rem !important",
    color: "#F9A512 !important",
  },
  title: {
    fontSize: "1.4rem !important",
    fontWeight: "bold",
  },
}));

export default function ProductDetailPage() {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState(1);
  const [err, setErr] = useState("");
  const [feedBack, setFeedBack] = useState(false);

  const [sizes, colors, refSize, refColor] = useMemo(() => {
    if (!product) return [[], {}, [], {}];
    return heplerSizeColor(product.items);
  }, [product]);

  console.log(color, size, amount);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct(id)
      .then((resp) => {
        console.log(resp);
        setProduct(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id]);

  const handleValueChange = (e) => {
    setErr("");
    setAmount(e.target.value);
  };

  const handleFeedBack = () => {
    setFeedBack(true);
    setTimeout(() => setFeedBack(false), 2000);
  };

  const handleAddToCartClick = () => {
    if (!product) return;
    if (!color) return setErr("Bạn chưa chọn color");

    if (!size) return setErr("Bạn chưa chọn size");

    if (!numberReg.test(amount)) return setErr("Giá trị phải là số");

    const am = parseInt(amount);
    const maxAmount = getQuantity(product.items, color, size);
    if (am > maxAmount) return setErr("Số lượng không được vượt quá hiện có");

    const item = {
      productId: product.id,
      productName: product.name,
      size: size,
      color: color,
      amount: am,
      maxAmount: maxAmount,
      price: product.price,
    };
    console.log(item);
    dispatch(addToCart(item));

    setSize(0);
    setColor(0);
    setErr("");
    handleFeedBack();
  };

  return (
    <div>
      <div style={{ fontSize: "2rem" }}>Chi tiết sản phẩm</div>
      <hr />
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper className={classes.wrapper}>
          <Grid container>
            <Grid item md={5} sm={6} sx={12}>
              <Grid container justifyContent="center">
                <img
                  src={`${product?.images[0]}`}
                  style={{ width: "100%", objectFit: "cover" }}
                  alt="anh dep"
                />
              </Grid>
            </Grid>
            <Grid item md={7} sm={6} sx={12}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td className={classes.title}>TÊN SẢN PHẨM</td>
                    <td className={classes.title}>{product?.name}</td>
                  </tr>
                  <tr>
                    <td className={classes.price}>GIÁ</td>
                    <td className={classes.price}>
                      {/* {number2VNCurrency(product?.price)} */}
                      {product.rate !== undefined ? (
                        <>
                          <del>{number2VNCurrency(product.price)}</del>&nbsp;
                          {number2VNCurrency(
                            Math.round(product.price * (1 - product.rate))
                          )}
                        </>
                      ) : (
                        number2VNCurrency(product.price)
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>MÔ TẢ</td>
                    <td>{product?.shortDescription}</td>
                  </tr>
                  <tr>
                    <td>THƯƠNG HIỆU</td>
                    <td>{product?.brand}</td>
                  </tr>
                  <tr>
                    <td>MÀU</td>
                    <td>
                      <MyGroupBtn
                        values={colors}
                        currentValue={color}
                        setValue={setColor}
                        refValues={refSize}
                        currentRefValue={size}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SIZE</td>
                    <td>
                      <MyGroupBtn
                        values={sizes}
                        currentValue={size}
                        setValue={setSize}
                        refValues={refColor}
                        currentRefValue={color}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SỐ LƯỢNG</td>
                    <td>
                      <input
                        size={1}
                        value={amount}
                        onChange={handleValueChange}
                      />
                      &nbsp; hiện có: &nbsp;
                      {size && color
                        ? getQuantity(product.items, color, size)
                        : product.totalQuantity}
                    </td>
                  </tr>
                </tbody>
              </table>
              <FormHelperText error>{err}</FormHelperText>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCartClick}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Zoom in={feedBack}>
                  <Alert severity="success">Thêm thành công</Alert>
                </Zoom>
              </div>
            </Grid>
          </Grid>
          <hr />
          <Grid container>
            <Grid item>
              <h3>Mô tả chi tiết</h3>
              <div>{product?.details}</div>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

const numberReg = /^\d+$/;

function getQuantity(items, color, size) {
  const item = items.find((it) => it.color === color);
  const saq = item.list.find((x) => x.size === size);
  return saq.quantity;
}

function heplerSizeColor(items) {
  const [sizeObj, colors, refSize, refColor] = [{}, [], {}, {}];
  for (const item of items) {
    colors.push(item.color);
    const rowSize = [];
    for (const sq of item.list) {
      sizeObj[sq.size] = sq.size;
      rowSize.push(sq.size);
      if (refSize[sq.size] === undefined) refSize[sq.size] = [];
      refSize[sq.size].push(item.color);
    }
    refColor[item.color] = rowSize;
  }
  const sizes = Object.values(sizeObj);

  return [sizes, colors, refSize, refColor];
}
