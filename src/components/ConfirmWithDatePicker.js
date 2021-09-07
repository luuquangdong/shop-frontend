import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { date2DateTimeLocalString } from "utils/dateTimeHelper";

const useStyles = makeStyles((theme) => ({
  textField: {
    minWidth: 200,
  },
}));

function ConfirmWithDatePicker(props) {
  const {
    open,
    handleClose,
    message,
    title,
    handleVerify,
    // order,
    // updateOrder,
    // field,
    // state,
  } = props;
  const classes = useStyles();
  const [dateTime, setDateTime] = useState(() =>
    date2DateTimeLocalString(new Date())
  );

  const handleVerifyClick = () => {
    // const newOrder = { ...order };
    // newOrder.state = state;
    // newOrder[field] = new Date(dateTime);
    // updateOrder(newOrder);
    const date = new Date(dateTime);
    handleVerify(date);
    handleClose();
  };

  const handleDateTimeChange = (e) => setDateTime(e.target.value);

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <TextField
          id="datetime-local"
          label={message}
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleVerifyClick} variant="contained" color="primary">
          Xác nhận
        </Button>
        <Button onClick={handleClose} variant="contained">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmWithDatePicker.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleVerify: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

ConfirmWithDatePicker.defaultProps = {
  title: "Xác nhận",
  message: "Chọn ngày",
};

export default ConfirmWithDatePicker;
