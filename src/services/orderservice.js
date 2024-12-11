 import AxiosService from "../axiosConfig";
// import axios from 'axios';

export const createOrder = async order => {
  try {
    const { data } = AxiosService.post('/api/orders/create', order);
    console.log(data);
    return data;
    
    
  } catch (error) {}
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await AxiosService.get('/api/orders/newOrderForCurrentUser');
  return data;
};

export const pay = async paymentId => {
  try {
    const { data } = await AxiosService.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const trackOrderById = async orderId => {
  const { data } = await AxiosService.get('/api/orders/track/' + orderId);
  return data;
};

export const getAll = async state => {
  const { data } = await AxiosService.get(`/api/orders/${state ?? ''}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await AxiosService.get(`/api/orders/allstatus`);
  return data;
};
