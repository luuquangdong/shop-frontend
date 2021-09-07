import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import useHandleItemClick from "./useHandleItemClick";
import useHeader from "utils/useHeader";

function SingleItem({ title, icon: Icon, header, path }) {
  const currentHeader = useHeader();
  const handleItemClick = useHandleItemClick();

  return (
    <ListItem
      button
      key={title}
      onClick={handleItemClick.bind(
        null,
        `/admin${path}`,
        currentHeader === header
      )}
      selected={currentHeader === header}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

SingleItem.propTypes = {
  title: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

export default SingleItem;
