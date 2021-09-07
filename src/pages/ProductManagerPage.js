import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { number2VNCurrency } from "utils/common";
import { Link as RouteLink, useHistory } from "react-router-dom";
import {
  Button,
  LinearProgress,
  Link,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useAuthAxios } from "apis/base";

const columns = [
  {
    headerName: "ID",
    field: "id",
    headerAlign: "center",
    maxWidth: 100,
    align: "center",
  },
  {
    headerName: "Tên sản phẩm",
    field: "name",
    headerAlign: "center",
    minWidth: 200,
    flex: 1,
    renderCell: (cell) => (
      <Link component={RouteLink} to={`/admin/products/${cell.row.id}`}>
        {cell.value}
      </Link>
    ),
  },
  {
    headerName: "Thương hiệu",
    field: "brand",
    headerAlign: "center",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "Giá",
    field: "price",
    headerAlign: "center",
    minWidth: 120,
    flex: 0.5,
    align: "center",
    renderCell: (cell) => `${number2VNCurrency(cell.value)}`,
  },
  {
    field: "totalQuantity",
    headerName: "Số lượng",
    minWidth: 120,
    flex: 0.5,
    headerAlign: "center",
    align: "center",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    fontSize: "1.5rem",
    color: "#787878",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
}));

export default function ProductManagerPage() {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const authAxios = useAuthAxios();

  useEffect(() => {
    setLoading(true);
    authAxios.get("/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const handlePageSizeChange = (newPageSize) => setPageSize(newPageSize);

  const history = useHistory();

  if (loading) return <LinearProgress />;

  return (
    <div>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.title}>Danh sách sản phẩm</div>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/admin/products/add")}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <DataGrid
          disableColumnMenu
          autoHeight
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          rows={products}
          columns={columns}
        />
      </Paper>
    </div>
  );
}
