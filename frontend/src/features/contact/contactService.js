import axios from 'axios';
import { base_url } from '../../utils/AxiosConfig';

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry`, contactData);
  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  postQuery,
};
