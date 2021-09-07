import React from "react";
import useHeader from "utils/useHeader";
import useHandleItemClick from "./useHandleItemClick";

const {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  makeStyles,
} = require("@material-ui/core");
const { ExpandLess, ExpandMore } = require("@material-ui/icons");
const { useState, useCallback } = require("react");

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomListItem = (props) => {
  const { title, icon: Icon, items, path: parentPath } = props;
  const [open, setOpen] = useState(false);
  const currentHeader = useHeader();

  const classes = useStyles();

  const handleClick = useCallback(() => setOpen(!open), [open]);
  const handleItemClick = useHandleItemClick();

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(({ title, path, icon: Icon, header }) => (
            <ListItem
              button
              className={classes.nested}
              onClick={handleItemClick.bind(
                null,
                `/admin${parentPath}${path}`,
                currentHeader === header
              )}
              key={title}
              selected={currentHeader === header}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default React.memo(CustomListItem);
