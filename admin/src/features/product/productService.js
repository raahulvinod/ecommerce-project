import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      color: product.color,
      quantity: product.quantity,
      images: product.images,
      tags: product.tags,
    },
    config
  );

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
};

export default productService;
