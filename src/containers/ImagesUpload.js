import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imgLabel: {
    fontSize: "1rem",
  },
  inputFile: {
    width: 95,
  },
}));

function ImagesUpload(props) {
  const { handleImageFileChange, imageFiles } = props;
  const classes = useStyles();

  const handleFileChange = (e) => {
    const files = Object.values(e.target.files);
    // console.log(files);
    if (handleImageFileChange) handleImageFileChange(files);
  };

  return (
    <div className={classes.root}>
      <label htmlFor="images" className={classes.imgLabel}>
        Upload ảnh
      </label>
      <input
        className={classes.inputFile}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      {imageFiles.length === 0 ? (
        <div>Chưa có ảnh được chọn</div>
      ) : (
        imageFiles.map((file) => <div key={file.name}>{file.name}</div>)
      )}
    </div>
  );
}

ImagesUpload.propTypes = {
  imageFilesChange: PropTypes.func.isRequired,
};

export default ImagesUpload;
