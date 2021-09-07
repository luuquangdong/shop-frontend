import React, { useReducer } from "react";
import PropTypes, { oneOf } from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { number2VNCurrency } from "utils/common";
import { orderState2String } from "pages/AdminOrderAll";
import Confirm from "./Confirm";
import { useSnackbar } from "notistack";
import ConfirmWithDatePicker from "./ConfirmWithDatePicker";
import { date2hhmmddmmyyyy } from "utils/dateTimeHelper";
import { useAuthAxios } from "apis/base";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  headerLabel: {
    fontSize: "1rem",
    color: "#777",
    textDecoration: "underline",
    marginTop: theme.spacing(1),
    // borderBottom: "1px #ccc solid",
  },
  label: {
    width: 180,
  },
  content: {
    fontSize: "0.9rem",
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  orderItems: {
    width: "100%",
    "& th": {
      borderBottom: "1px #ccc solid",
    },
    "& td": {
      borderBottom: "1px #ccc solid",
      fontSize: "0.9rem",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
}));

const initialState = {
  openConfirm: false,
  handleVerifyConfirm: null,
  openDateTimeConfirm: false,
  titleConfirm: "",
  messageConfirm: "",
  field: "",
  state: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_CONFIRM_VERIFY_ORDER":
      return {
        ...state,
        openConfirm: true,
        handleVerifyConfirm: action.payload,
        titleConfirm: "Xác nhận",
        messageConfirm: "Xác nhận duyệt đơn hàng?",
      };
    case "OPEN_CONFIRM_CANCEL_ORDER":
      return {
        ...state,
        openConfirm: true,
        titleConfirm: "Xác nhận",
        messageConfirm: "Xác nhận hủy đơn hàng?",
        handleVerifyConfirm: action.payload,
      };
    case "OPEN_CONFIRM_CANCEL_SHIPPING":
      return {
        ...state,
        openConfirm: true,
        titleConfirm: "Xác nhận",
        messageConfirm: "Xác nhận hủy ship hàng?",
        handleVerifyConfirm: action.payload,
      };
    case "OPEN_CONFIRM_FINISH_BACK":
      return {
        ...state,
        openConfirm: true,
        titleConfirm: "Xác nhận",
        messageConfirm: "Xác nhận hủy hoàn thành đơn hàng?",
        handleVerifyConfirm: action.payload,
      };
    case "CLOSE_CONFIRM":
      return {
        ...state,
        openConfirm: false,
      };
    /* Date time confirm */
    case "OPEN_CONFIRM_SHIPPING":
      return {
        ...state,
        openDateTimeConfirm: true,
        titleConfirm: "Xác nhận ship hàng",
        messageConfirm: "Chọn ngày ship hàng",
        field: "shipDate",
        state: "SHIPPING",
      };
    case "OPEN_CONFIRM_FINISH":
      return {
        ...state,
        openDateTimeConfirm: true,
        titleConfirm: "Xác nhận giao dịch thành công",
        messageConfirm: "Chọn ngày giao dịch",
        field: "receivedDate",
        state: "FINISHED",
      };
    case "CLOSE_DATETIME_CONFIRM":
      return {
        ...state,
        openDateTimeConfirm: false,
      };
    default:
      return state;
  }
};

function OrderModal(props) {
  const { order, open, handleClose, updateOrder } = props;
  const classes = useStyles();
  const authAxios = useAuthAxios();
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Confirm */
  const handleCloseConfirm = () => dispatch({ type: "CLOSE_CONFIRM" });
  const handleOrderUpdate = async (newOrder) => {
    try {
      if (newOrder.state === "CANCEL") {
        const res = await authAxios.get(`/orders/cancel/${newOrder.id}`);
        updateOrder(res.data);
        enqueueSnackbar("Hủy đơn hàng thành công", { variant: "success" });
        return;
      }

      const res = await authAxios.post("/orders/update-state", newOrder);
      updateOrder(res.data);
      enqueueSnackbar("Thao tác thành công", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Có lỗi xảy ra", { variant: "error" });
    }
  };

  const handleCloseDateTimeConfirm = () =>
    dispatch({ type: "CLOSE_DATETIME_CONFIRM" });

  /* Button click */
  const handleVerifyBtnClick = () => {
    const newOrder = { ...order, state: "VERIFIED" };
    dispatch({
      type: "OPEN_CONFIRM_VERIFY_ORDER",
      payload: handleOrderUpdate.bind(null, newOrder),
    });
  };
  const handleCancelBtnClick = () => {
    const newOrder = { ...order, state: "CANCEL" };
    dispatch({
      type: "OPEN_CONFIRM_CANCEL_ORDER",
      payload: handleOrderUpdate.bind(null, newOrder),
    });
  };
  const handleCancelShippingBtnClick = () => {
    const newOrder = { ...order, state: "VERIFIED" };
    dispatch({
      type: "OPEN_CONFIRM_CANCEL_SHIPPING",
      payload: handleOrderUpdate.bind(null, newOrder),
    });
  };
  const handleFinishBackBtnClick = () => {
    const newOrder = { ...order, state: "SHIPPING" };
    dispatch({
      type: "OPEN_CONFIRM_FINISH_BACK",
      payload: handleOrderUpdate.bind(null, newOrder),
    });
  };
  // Btn open date time confirm
  const handleShippingBtnClick = () => {
    dispatch({
      type: "OPEN_CONFIRM_SHIPPING",
    });
  };
  const handleFinishBtnClick = () => {
    dispatch({
      type: "OPEN_CONFIRM_FINISH",
    });
  };
  const handleVerifyDateTimeConfirm = (date) => {
    const newOrder = { ...order };
    newOrder[state.field] = date;
    newOrder.state = state.state;
    handleOrderUpdate(newOrder);
  };

  if (!order) return null;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        scroll="paper"
        fullWidth
      >
        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        <DialogContent dividers>
          <div className={classes.headerLabel}>Thông tin khách hàng</div>
          <table className={classes.table}>
            <tr>
              <td className={classes.label}>HỌ TÊN KHÁCH HÀNG</td>
              <td className={classes.content}>{order?.customerName}</td>
            </tr>
            <tr>
              <td className={classes.label}>SỐ ĐIỆN THOẠI</td>
              <td className={classes.content}>{order?.phoneNumber}</td>
            </tr>
          </table>
          <div className={classes.headerLabel}>Địa chỉ nhận hàng</div>
          <table className={classes.table}>
            <tr>
              <td className={classes.label}>VỊ TRÍ CỤ THỂ</td>
              <td className={classes.content}>{order?.address?.detail}</td>
            </tr>
            <tr>
              <td className={classes.label}>XÃ/PHƯỜNG</td>
              <td className={classes.content}>{order?.address?.ward}</td>
            </tr>
            <tr>
              <td className={classes.label}>QUẬN/HUYỆN</td>
              <td className={classes.content}>{order?.address?.district}</td>
            </tr>
            <tr>
              <td className={classes.label}>TỈNH/THÀNH PHỐ</td>
              <td className={classes.content}>{order?.address?.province}</td>
            </tr>
          </table>
          <div className={classes.headerLabel}>Thông tin đơn hàng</div>
          <table>
            <tr>
              <td className={classes.label}>TRẠNG THÁI ĐƠN HÀNG</td>
              <td className={classes.content}>
                {orderState2String[order?.state]}
              </td>
            </tr>
            <tr>
              <td className={classes.label}>TỔNG TIỀN</td>
              <td className={classes.content}>
                {number2VNCurrency(order?.totalPrice)}
              </td>
            </tr>
            <tr>
              <td className={classes.label}>NGÀY ĐẶT HÀNG</td>
              <td className={classes.content}>
                {date2hhmmddmmyyyy(order?.createdDate)}
              </td>
            </tr>
            {(order?.state === "SHIPPING" || order?.state === "FINISHED") && (
              <tr>
                <td className={classes.label}>NGÀY GIAO HÀNG</td>
                <td className={classes.content}>
                  {date2hhmmddmmyyyy(order?.shipDate)}
                </td>
              </tr>
            )}
            {order?.state === "FINISHED" && (
              <tr>
                <td className={classes.label}>NGÀY NHẬN HÀNG</td>
                <td className={classes.content}>
                  {date2hhmmddmmyyyy(order?.receivedDate)}
                </td>
              </tr>
            )}
          </table>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.accordionHeading}>
                Chi tiết sản phẩm
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <table className={classes.orderItems}>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Size</th>
                  <th>Màu</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
                {order?.orderItems.map((item) => (
                  <tr>
                    <td>{item.productName}</td>
                    <td>
                      <center>{item.size}</center>
                    </td>
                    <td>
                      <center>{item.color}</center>
                    </td>
                    <td>
                      <center>{item.amount}</center>
                    </td>
                    <td>
                      <center>{number2VNCurrency(item.price)}</center>
                    </td>
                  </tr>
                ))}
              </table>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions className={classes.actions}>
          {/* <Button onClick={handleClose}>Close</Button> */}
          {order?.state !== "FINISHED" && order?.state !== "CANCEL" && (
            <Button variant="contained" onClick={handleCancelBtnClick}>
              Hủy đơn hàng
            </Button>
          )}
          {order?.state === "NOT_VERIFY" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleVerifyBtnClick}
            >
              Duyệt
            </Button>
          )}
          {order?.state === "VERIFIED" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleShippingBtnClick}
            >
              Giao hàng
            </Button>
          )}
          {order?.state === "SHIPPING" && (
            <>
              <Button
                variant="contained"
                onClick={handleCancelShippingBtnClick}
              >
                Hủy giao hàng
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinishBtnClick}
              >
                Hoàn thành
              </Button>
            </>
          )}
          {order?.state === "FINISHED" && (
            <Button variant="contained" onClick={handleFinishBackBtnClick}>
              Hủy hoàn thành
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Confirm
        title={state.titleConfirm}
        message={state.messageConfirm}
        open={state.openConfirm}
        handleClose={handleCloseConfirm}
        handleVerify={state.handleVerifyConfirm}
      />
      <ConfirmWithDatePicker
        title={state.titleConfirm}
        message={state.messageConfirm}
        open={state.openDateTimeConfirm}
        handleClose={handleCloseDateTimeConfirm}
        handleVerify={handleVerifyDateTimeConfirm}
      />
    </>
  );
}

OrderModal.propTypes = {
  order: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    state: oneOf(["NOT_VERIFY", "VERIFIED", "SHIPPING", "FINISHED", "CANCEL"])
      .isRequired,
    province: PropTypes.string.isRequired,
    district: PropTypes.string.isRequired,
    ward: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        productName: PropTypes.string,
        size: PropTypes.number,
        color: PropTypes.string,
        amount: PropTypes.number,
        price: PropTypes.number,
      })
    ),
  }),
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

OrderModal.defaultProps = {
  order: null,
};

export default OrderModal;
