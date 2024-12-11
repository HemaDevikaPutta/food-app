import AxiosService from '../axiosConfig';


AxiosService.interceptors.request.use(
  req => {
    const user = localStorage.getItem('user');
    console.log(user);
    const token = user && JSON.parse(user).token;
    req.headers['Authorization'] = `Bearer ${token}`
    if (token === req.headers['Access_token'] )
    console.log(req);
    return req;
    
  },
  error => {
    return Promise.reject(error);
  }
);
