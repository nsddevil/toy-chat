import axios from 'axios';

const client = axios.create();

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('toyshop_token');
    config.headers.authorization = token ? token : '';
    return config;
  },
  (err) => Promise.reject(err)
);

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    if (err.response.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      return client.get('/api/user/rftoken').then((res) => {
        localStorage.setItem('toyshop_token', res.data.token);
        return client(originalRequest);
      });
    }
    return Promise.reject(err);
  }
);

export default client;
