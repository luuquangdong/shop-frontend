import React, { useEffect, useMemo, useState } from "react";
import {
  FormControl,
  makeStyles,
  MenuItem,
  Paper,
  InputLabel,
  Select,
  Link,
  LinearProgress,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { number2VNCurrency } from "utils/common";
import OrderModal from "components/OrderModal";
import { date2ddmmyyyy } from "utils/dateTimeHelper";
import { useAuthAxios } from "apis/base";

export const orderState2String = {
  NOT_VERIFY: "Chưa duyệt",
  VERIFIED: "Đã duyệt",
  SHIPPING: "Đang giao hàng",
  FINISHED: "Hoàn thành",
  CANCEL: "Đã hủy",
};

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
  formControl: {
    minWidth: 120,
  },
  linh: {
    cursor: "pointer",
  },
}));

export default function AdminOrderAll() {
  const classes = useStyles();
  const [pageSize, setPageSize] = useState(10);
  const [stateFilter, setStateFilter] = useState("NOT_VERIFY");
  const [data, setData] = useState([]);
  const [dataProxy, setDataProxy] = useState([]);
  const [order, setOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const authAxios = useAuthAxios();

  useEffect(() => {
    setLoading(true);
    authAxios.get("/orders").then((res) => {
      const data = res.data;
      setData(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const dataFilter = data.filter((item) => item.state.includes(stateFilter));
    setDataProxy(dataFilter);
  }, [data]);

  useEffect(() => {
    const dataFilter = data.filter((item) => item.state.includes(stateFilter));
    setDataProxy(dataFilter);
  }, [stateFilter]);

  const handlePageSizeChange = (newPageSize) => setPageSize(newPageSize);
  const handleChangeStateFilter = (e) => setStateFilter(e.target.value);

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (order) => {
    setOrder(order);
    setOpenModal(true);
  };

  const updateOrder = (newOrder) => {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === newOrder.id) {
        index = i;
        break;
      }
    }
    if (index === -1) return;
    const newData = [
      ...data.slice(0, index),
      newOrder,
      ...data.slice(index + 1),
    ];
    // console.log(newData);
    setData(newData);
    setOrder(newOrder);
  };

  console.log(data);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        maxWidth: 100,
      },
      {
        field: "customerName",
        headerName: "Tên khách hàng",
        headerAlign: "center",
        width: 200,
        // flex: 1,
        renderCell: (params) => (
          <Link
            onClick={handleOpenModal.bind(null, params.row)}
            className={classes.linh}
          >
            {params.value}
          </Link>
        ),
      },
      {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        headerAlign: "center",
        width: 150,
      },
      {
        field: "createdDate",
        headerName: "Ngày đặt",
        headerAlign: "center",
        width: 120,
        valueFormatter: (params) => date2ddmmyyyy(params.value),
      },
      {
        field: "totalPrice",
        headerName: "Tổng tiền",
        headerAlign: "center",
        width: 120,
        valueFormatter: (params) => number2VNCurrency(params.value),
      },
      {
        field: "state",
        headerName: "Trạng thái",
        headerAlign: "center",
        width: 140,
        valueFormatter: (params) => orderState2String[params.value],
      },
    ],
    [handleOpenModal]
  );

  if (loading) return <LinearProgress />;
  return (
    <Paper className={classes.paper} elevation={3}>
      <div className={classes.title}>Danh sách đơn hàng</div>
      <div className={classes.actions}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stateFilter}
            onChange={handleChangeStateFilter}
          >
            <MenuItem value="NOT_VERIFY">
              {orderState2String["NOT_VERIFY"]}
            </MenuItem>
            <MenuItem value="VERIFIED">
              {orderState2String["VERIFIED"]}
            </MenuItem>
            <MenuItem value="SHIPPING">
              {orderState2String["SHIPPING"]}
            </MenuItem>
            <MenuItem value="FINISHED">
              {orderState2String["FINISHED"]}
            </MenuItem>
            <MenuItem value="CANCEL">{orderState2String["CANCEL"]}</MenuItem>
            <MenuItem value="">Tất cả</MenuItem>
          </Select>
        </FormControl>
      </div>
      <DataGrid
        disableColumnMenu
        autoHeight
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
        rows={dataProxy}
        columns={columns}
      />
      <OrderModal
        updateOrder={updateOrder}
        open={openModal}
        handleClose={handleCloseModal}
        order={order}
      />
    </Paper>
  );
}
