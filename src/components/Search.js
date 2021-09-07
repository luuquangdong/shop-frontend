import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: theme.palette.primary.light,
    borderRadius: 3,
    marginRight: theme.spacing(1),
  },
  search: {
    border: "none",
    backgroundColor: "inherit",
    color: "white",
    fontSize: "1rem",
    "&:focus": {
      outline: "none !important",
    },
    "&::placeholder": {
      color: "#CDDFA0",
    },
  },
  icon: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

function Search({ submit, timeDebounce }) {
  const [text, setText] = useState("");
  const timeoutRef = useRef(null);
  const classes = useStyles();

  const handleSubmit = () => {
    if (submit === null) return;
    submit(text);
  };

  const handleTextChange = (e) => {
    const txt = e.target.value;
    setText(txt);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      submit(txt);
    }, timeDebounce);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <SearchIcon className={classes.icon} />
          </Grid>
          <Grid item>
            <input
              className={classes.search}
              placeholder="Tìm kiếm..."
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

Search.propTypes = {
  submit: PropTypes.func,
  timeDebounce: PropTypes.number,
};

Search.defaultProps = {
  submit: null,
  timeDebounce: 600,
};

export default Search;
