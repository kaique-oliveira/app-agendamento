import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://159.89.239.199:3002/api/',
  //baseURL: 'http://localhost:3001/api/',
});
