import {
  Divider,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { fetchProducts } from "apis/productAPI";
import ProductCard from "components/ProductCard";
import React, { useEffect, useReducer } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "2rem",
  },
  wrapper: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    backgroundColor: "#FFFFEE",
  },
}));

const initState = {
  data: [],
  pageData: [],
  loading: false,
  totalPage: 0,
  page: 1,
  error: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "fetchData":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        data: payload.data,
        totalPage: payload.totalPage,
        loading: false,
      };
    case "error":
      return {
        ...state,
        loading: false,
        error: "Có lỗi xảy ra, vui lòng thử lại sau",
      };
    case "newPage": {
      return {
        ...state,
        pageData: payload,
      };
    }
    case "pageChange": {
      return {
        ...state,
        page: payload,
      };
    }
    default:
      return state;
  }
};

const PER_PAGE = 20;

export default function ProductPage() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initState);
  const { data, pageData, loading, totalPage, page, error } = state;

  useEffect(() => {
    dispatch({ type: "fetchData" });
    fetchProducts()
      .then((res) => {
        dispatch({
          type: "success",
          payload: {
            data: res.data,
            totalPage: Math.ceil(res.data.length / PER_PAGE),
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: "error",
        });
      });
  }, []);

  useEffect(() => {
    const startIndex = PER_PAGE * (page - 1);
    const newPageData = data.slice(startIndex, startIndex + PER_PAGE);
    dispatch({ type: "newPage", payload: newPageData });
  }, [data, page]);

  const handlePageChange = (e, newPage) => {
    dispatch({ type: "pageChange", payload: newPage });
  };
  console.log(pageData);
  if (loading) return <LinearProgress />;
  return (
    <>
      <div className={classes.title}>Danh sách sản phẩm</div>
      <Divider />
      <br />
      {error !== "" && <div>{error}</div>}
      <Paper className={classes.wrapper}>
        <Grid container spacing={5} justifyContent="center">
          {pageData.map((product) => (
            <Grid item sm={4} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <br />
        <Grid container justifyContent="center">
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Paper>
    </>
  );
}
