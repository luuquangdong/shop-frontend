import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import ImagesUpload from "containers/ImagesUpload";
import { FieldArray, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { splitSizeAndQuantity } from "utils/productHelper";
import * as yup from "yup";
import uploadImage from "apis/uploadImage";
import { useAuthAxios } from "apis/base";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(3),
  },
  input: {},
  itemRoot: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "#EFEFEF",
    borderRadius: "5px",
  },
  addBtn: {
    backgroundColor: "#60A561",
    color: "white",
    "&:hover": {
      backgroundColor: "#214E34",
    },
  },
  submitBtn: {
    alignSelf: "center",
  },
}));

const productSchema = yup.object().shape({
  name: yup.string().required("Đây là trường bắt buộc"),
  price: yup
    .string()
    .matches(/^\d{3,9}$/, "Giá phải là số")
    .required("Đây là trường bắt buộc"),
  brand: yup.string().required("Đây là trường bắt buộc"),
  shortDescription: yup.string(),
  // items: [{ color: "", sizeAndQuantity: "" }],
  items: yup.array().of(
    yup.object().shape({
      color: yup.string().required("Đây là trường bắt buộc"),
      sizeAndQuantity: yup
        .string()
        .matches(
          /^( *\d+ *- *\d+ *)(, *\d+ *- *\d+ *)*$/,
          "Phải đúng định dạng: size-số lượng, size-số lượng,..."
        )
        .required("Đây là trường bắt buộc"),
    })
  ),
  detail: yup.string(),
});

export default function AdminAddProductPage() {
  const classes = useStyles();
  const [imageFiles, setImageFiles] = useState([]);
  const [errImg, setErrImg] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const authAxios = useAuthAxios();

  const uploadImages = async (imageFiles) => {
    const res = await Promise.all(imageFiles.map((file) => uploadImage(file)));
    // console.log(res);
    return res.map((row) => row.data.url);
  };

  const handleImageFileChange = (files) => {
    setErrImg("");
    setImageFiles(files);
  };

  const handleSubmit = async (values, submitProps) => {
    if (imageFiles.length === 0) {
      setErrImg("Bạn chưa thêm ảnh");
      return;
    }

    const imageUrls = await uploadImages(imageFiles);

    for (let i = 0; i < values.items.length; i++) {
      values.items[i].list = splitSizeAndQuantity(
        values.items[i].sizeAndQuantity
      );
    }
    values.images = imageUrls;
    // tính cả total nữa
    console.log(values);
    try {
      const newProduct = await authAxios.post("/products/create", values);
      // const newProduct = await useCreateProduct(values);

      console.log(newProduct);
      enqueueSnackbar("Thêm sản phẩm thành công", { variant: "success" });
      // console.log(submitProps);
      submitProps.resetForm();
      setImageFiles([]);
      console.log("done");
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <div>
      <Link component={RouteLink} to="/admin/products/all">
        &lt; Trở lại trang trước
      </Link>
      <br />
      <br />
      <Grid container justifyContent="center">
        <Grid item sm={10} xs={12}>
          <Paper className={classes.wrapper}>
            <Grid container spacing={2}>
              <ImagesUpload
                handleImageFileChange={handleImageFileChange}
                imageFiles={imageFiles}
              />
              <FormHelperText error={true}>{errImg}</FormHelperText>
              <br />
              <Divider />
              <br />
              <Formik
                initialValues={{
                  name: "",
                  price: "",
                  brand: "",
                  shortDescription: "",
                  items: [{ color: "", sizeAndQuantity: "" }],
                  detail: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={productSchema}
              >
                {({
                  values,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  touched,
                  errors,
                  isSubmitting,
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div style={{ width: "100%" }}>Thông tin chung</div>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            className={classes.input}
                            id="name"
                            name="name"
                            label="Nhập tên sản phẩm"
                            variant="outlined"
                            size="small"
                            fullWidth
                            error={errors.name && touched.name}
                            helperText={
                              errors.name && touched.name ? errors.name : ""
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.input}
                            id="price"
                            name="price"
                            label="Giá"
                            variant="outlined"
                            size="small"
                            fullWidth
                            error={errors.price && touched.price}
                            helperText={
                              errors.price && touched.price ? errors.price : ""
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            className={classes.input}
                            id="brand"
                            name="brand"
                            label="Thương hiệu"
                            variant="outlined"
                            size="small"
                            fullWidth
                            error={errors.brand && touched.brand}
                            helperText={
                              errors.brand && touched.brand ? errors.brand : ""
                            }
                            // {...getFieldProps}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.brand}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            className={classes.input}
                            id="shortDescription"
                            name="shortDescription"
                            label="Mô tả ngắn gọn"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.shortDescription}
                          />
                        </Grid>
                        <hr />
                        <div style={{ width: "100%", marginLeft: "10px" }}>
                          Thông tin cụ thể
                        </div>
                        <FieldArray name="items">
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps;
                            const { values } = form;
                            const { items } = values;
                            const removeItem = (index) => remove(index);
                            const addNewItem = () =>
                              push({ color: "", sizeAndQuantity: "" });
                            return (
                              <Grid
                                container
                                spacing={1}
                                justifyContent="center"
                                className={classes.itemRoot}
                              >
                                {items.map((it, index) => (
                                  <>
                                    <Grid item xs={3} key={`clr-${index}`}>
                                      <TextField
                                        id={`color-${index}`}
                                        name={`items[${index}].color`}
                                        label="Màu"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                          errors.items &&
                                          errors.items[index]?.color &&
                                          touched.items &&
                                          touched.items[index]?.color
                                        }
                                        helperText={
                                          errors.items &&
                                          errors.items[index]?.color &&
                                          touched.items &&
                                          touched.items[index]?.color
                                            ? errors.items &&
                                              errors.items[index]?.color
                                            : ""
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.items[index].color}
                                      />
                                    </Grid>
                                    <Grid item xs={8} key={`sq-${index}`}>
                                      <TextField
                                        id={`sizeAndQuantity-${index}`}
                                        name={`items[${index}].sizeAndQuantity`}
                                        label="Size-Số lượng"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        error={
                                          errors.items &&
                                          errors.items[index]
                                            ?.sizeAndQuantity &&
                                          touched.items &&
                                          touched.items[index]?.sizeAndQuantity
                                        }
                                        helperText={
                                          errors.items &&
                                          errors.items[index]
                                            ?.sizeAndQuantity &&
                                          touched.items &&
                                          touched.items[index]?.sizeAndQuantity
                                            ? errors.items &&
                                              errors.items[index]
                                                ?.sizeAndQuantity
                                            : ""
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={
                                          values.items[index].sizeAndQuantity
                                        }
                                      />
                                    </Grid>
                                    <Grid item xs={1} key={`btn-${index}`}>
                                      {items.length !== 1 && (
                                        <Button
                                          onClick={removeItem.bind(null, index)}
                                        >
                                          Xóa
                                        </Button>
                                      )}
                                    </Grid>
                                  </>
                                ))}
                                <Button
                                  className={classes.addBtn}
                                  onClick={addNewItem}
                                >
                                  Thêm
                                </Button>
                              </Grid>
                            );
                          }}
                        </FieldArray>
                        <hr />
                        <Grid item xs={12}>
                          <TextField
                            className={classes.input}
                            id="detail"
                            name="detail"
                            label="Mô tả chi tiết"
                            variant="outlined"
                            rows={6}
                            fullWidth
                            multiline
                            error={errors.detail && touched.detail}
                            helperText={errors.detail}
                            // {...getFieldProps}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.detail}
                          />
                        </Grid>
                        <Grid container justifyContent="center">
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Thêm sản phẩm
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  );
                }}
              </Formik>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
