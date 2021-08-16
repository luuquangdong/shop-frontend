import React from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StoreIcon from '@material-ui/icons/Store';
import Navbar from './NavBar/Navbar';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      fontSize: theme.typography.h1,
      padding: theme.spacing(2),
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
        color: '#d6f5ff'
      }
    },
    titleIcon: {
      marginRight: theme.spacing(1),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    growPre: {
      flexGrow: 1,
    },
    growAfter: {
      flexGrow: 1,
    },
    center: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    mot: {
      color: '#111'
    },
    hai: {
      padding: theme.spacing(1)
    }
  }),
);

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to='/' className={classes.title}>
            <StoreIcon className={classes.titleIcon}/>
            <Typography variant="h5">
              My Shop
            </Typography>
          </Link>
          <div className={classes.growPre} />
          <Navbar />
          <div className={classes.growAfter} />

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {

}

export default Header

