import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '1rem',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    '& li': {
      float: 'left',
    },
    '& a':{
      display: 'inline-block',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      padding: '14px 16px',
      borderRadius: 3,
    },
    '& a:hover':{
      backgroundColor: theme.palette.primary.dark
    }
  },
  tmp: {
    
  }
}))

function Navbar(props) {
  
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      <li>
        <Link to='#'>Home</Link>
      </li>
      <li>
        <Link to='#'>New</Link>
      </li>
      <Dropdown/>
    </ul>
  )
}

Navbar.propTypes = {

}

export default Navbar

