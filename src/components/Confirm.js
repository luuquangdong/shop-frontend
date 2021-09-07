import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    minWidth: 250,
  },
}));

function Confirm(props) {
  const { handleVerify, open, handleClose, message, title } = props;
  const classes = useStyles();

  const handleVerifyClick = () => {
    if (!handleVerify) return;
    handleVerify();
    handleClose();
  };

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <div className={classes.content}>{message}</div>
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

Confirm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleVerify: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

Confirm.defaultProps = {
  handleVerify: null,
  title: "Xác nhận",
  message: "Xác nhận hành động?",
};

export default Confirm;
