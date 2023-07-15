import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaorder/${id}`, config);

  return response.data;
};

const getMothlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );

  return response.data;
};

const getYearlyStats = async () => {
  const response = await axios.get(`${base_url}user/getyearlyorders`, config);

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMothlyOrders,
  getYearlyStats,
};

export default authService;
