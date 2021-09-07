import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_IMAGE_URL } from "assets/images";
import { Card, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { number2VNCurrency } from "utils/common";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 0 4px #AAA",
    position: "relative",
    transition: "transform 0.2 linear",
    width: "100%",
    "&:hover": {
      transform: "translate(0, -2px)",
    },
    height: "100%",
  },
  /* Image */
  image: {
    // margin: "auto",
    height: "100%",
    objectFit: "cover",
    // width: "auto",
  },
  cover: {
    position: "relative",
  },
  discountImg: {
    position: "absolute",
    backgroundColor: "#F3A712",
    top: 0,
    left: 0,
    fontSize: "1rem",
    padding: 3,
    color: "white",
  },
  newImg: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: "1rem",
    padding: 5,
    color: "white",
    backgroundColor: "rgba(63, 81, 181, 0.9)",
  },
  /* Content */
  content: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-beetween",
    padding: "8px !important",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 1 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
  price: {
    marginTop: "auto",
    fontWeight: "bold",
  },
  summary: {
    fontSize: "0.8rem",
    color: "#767676",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    "-webkit-box-orient": "vertical",
  },
  /* Action */
  actions: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: 5,
  },
  addToCartBtn: {
    "&:hover": {
      textDecorate: "underline",
      backgroundColor: "#ddd",
    },
  },
}));

function ProductCard({ product }) {
  const classes = useStyles();
  const handleError = (e) => (e.target.src = DEFAULT_IMAGE_URL);
  return (
    <Link to={`/product/detail/${product.id}`}>
      <Card className={classes.root}>
        <div className={classes.cover}>
          {product.rate !== undefined && (
            <div className={classes.discountImg}>
              GIẢM
              <br />
              <center>{product.rate * 100}%</center>
            </div>
          )}
          {product.isNew === true && <div className={classes.newImg}>NEW</div>}
          <CardMedia
            className={classes.image}
            component="img"
            image={product.images[0]}
            title="title"
            onError={handleError}
          />
        </div>
        <CardContent className={classes.content}>
          <div className={classes.title}>{product.name}</div>
          <div className={classes.summary}>{product.shortDescription}</div>
          <div className={classes.price}>
            {product.rate !== undefined ? (
              <>
                <del style={{ color: "#666" }}>
                  {number2VNCurrency(product.price)}
                </del>
                &nbsp;
                {number2VNCurrency(
                  Math.round(product.price * (1 - product.rate))
                )}
              </>
            ) : (
              number2VNCurrency(product.price)
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
