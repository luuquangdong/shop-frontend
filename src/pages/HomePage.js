import React, { useEffect, useState } from "react";
import BRAND_IMG from "assets/images/brand1.webp";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import HeaderContainer from "containers/HeaderContainer";
import Footer from "components/Footer";
import ProductCard from "components/ProductCard";
import instanceAxios from "apis/base";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#EEE",
  },
  brandImg: {
    width: "100%",
  },
  content: {
    maxWidth: 1100,
    margin: "0 auto",
    paddingBottom: theme.spacing(5),
  },
  wrapper: {
    padding: theme.spacing(3),
  },
  header: {
    fontSize: "1.8rem",
    textTransform: "uppercase",
    color: theme.palette.primary.main,
    marginBottom: "5px",
  },
  row: {
    marginTop: theme.spacing(8),
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  console.log(data);

  useEffect(() => {
    instanceAxios.get("/products").then((res) => {
      setData(res.data);
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    let randomIndex = Math.floor(Math.random() * (data.length - 5));
    const newData = data.slice(randomIndex, randomIndex + 4).map((p) => {
      p.isNew = true;
      return p;
    });
    randomIndex = Math.floor(Math.random() * (data.length - 5));
    const discountData = data.slice(randomIndex, randomIndex + 4).map((p) => {
      p.rate = 0.4;
      return p;
    });
    setNewProducts(newData);
    setDiscountProducts(discountData);
  }, [data]);

  return (
    <div className={classes.root}>
      <HeaderContainer />
      <img src={BRAND_IMG} className={classes.brandImg} />
      <div className={classes.content}>
        <div className={classes.row}>
          <div className={classes.header}>Danh sách sản phẩm mới</div>
          <Paper className={classes.wrapper}>
            <Grid container spacing={3}>
              {newProducts.map((product) => (
                <Grid key={product.id} item md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </div>
        <div className={classes.row}>
          <div className={classes.header}>Danh sách sản phẩm đang giảm giá</div>
          <Paper className={classes.wrapper}>
            <Grid container spacing={3}>
              {discountProducts.map((product) => (
                <Grid key={product.id} item md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </div>
      </div>
      <Footer />
    </div>
  );
}
