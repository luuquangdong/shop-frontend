import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  dropDown: {
    display: 'inline-block',
  },
  dropDownBtn: {

  },
  dropDownContent: {
    display: 'none',
    fontSize: '0.9rem',
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    minWidth: 160,
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    borderRadius: 2,
    '& > a': {
      color: 'black',
      display: 'block',
      textAlign: 'left',
    },
    '$dropDown:hover &': {
      display: 'block',
    }
  },
  subLink: {
    color: 'black !important',
    display: 'block !important',
    textAlign: 'left !important',
    '$dropDownContent &:hover': {
      backgroundColor: '#ccc',
    }
  }
}))

function Dropdown(props) {

  const classes = useStyles();

  return (
    <li className={classes.dropDown}>
      <Link to={'#'} className={classes.dropDownBtn}>Dropdown</Link>
      <div className={classes.dropDownContent}>
        <Link to='/one' className={classes.subLink}>One</Link>
        <Link to='/two' className={classes.subLink}>Two</Link>
        <Link to='/three' className={classes.subLink}>Three</Link>
      </div>
    </li>
  )
}

Dropdown.propTypes = {

}

export default Dropdown

