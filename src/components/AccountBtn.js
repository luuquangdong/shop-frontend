import {
  Button,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Popover,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import React, { useMemo } from "react";
import { useHistory } from "react-router";
import useAuth from "utils/useAuth";

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      // backgroundColor: "#eee",
      // color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function AccountBtn() {
  const { token } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginClick = () => history.push("/login");
  const handleProfileClick = () => {
    setAnchorEl(null);
    history.push("/profile");
  };
  const handleLogoutClick = () => {
    logout();
    setAnchorEl(null);
  };

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

  return (
    <div>
      {token !== "" ? (
        <>
          <IconButton
            className={classes.icon}
            onClick={handleClick}
            aria-label="shopping-cart"
          >
            <PersonIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuList id="menu-list-grow">
              <MenuItem onClick={handleProfileClick}>
                Thông tin tài khoản
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
            </MenuList>
          </Popover>
        </>
      ) : (
        <Button color="inherit" onClick={handleLoginClick}>
          Login
        </Button>
      )}
    </div>
  );
}
