import instanceAxios, { useAuthAxios } from "apis/base";

const useCreateProduct = (product) => {
  const authAxios = useAuthAxios();
  return authAxios.post("/products/create", product);
};

const fetchProducts = () => {
  return instanceAxios.get("/products");
};

const fetchProduct = (productId) => {
  return instanceAxios.get(`/products/${productId}`);
};

export { fetchProducts, fetchProduct, useCreateProduct };
