import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    margin: 5,
    border: "1px solid #999",
    padding: "2px 6px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
  active: {
    border: "1px solid blue",
  },
  disable: {
    border: "1px solid #ddd",
    color: "#999",
  },
}));

export default function MyGroupBtn({
  values,
  currentValue,
  setValue,
  refValues,
  currentRefValue,
}) {
  const classes = useStyles();

  const handleClick = (value, isActive, isDisable) => {
    if (isDisable) return;
    if (isActive) return setValue(0);
    setValue(value);
  };

  return (
    <div className={classes.root}>
      {values.map((value) => {
        const isActive = value === currentValue;
        const isDisable =
          currentRefValue && !refValues[currentRefValue].includes(value);
        return (
          <div
            key={value}
            className={clsx(classes.item, {
              [classes.active]: isActive,
              [classes.disable]: isDisable,
            })}
            onClick={handleClick.bind(null, value, isActive, isDisable)}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}
