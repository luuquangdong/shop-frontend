const { default: axios } = require("axios");

const CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/dongcloud/image/upload";

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "et1gbgox");
  return axios.post(CLOUDINARY_URL, formData);
};

export default uploadImage;
