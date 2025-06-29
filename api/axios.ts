import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // 요청 인터셉터: 요청을 보내기 전에 수행할 작업 (예: 토큰 추가)
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
};

const handleError = (error: any) => {
  // 응답 인터셉터: 응답 에러 처리
  console.error('API Error:', error);
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(handleRequest, handleError);
axiosInstance.interceptors.response.use((response: AxiosResponse) => response, handleError);

interface Api {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

const api: Api = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
};

export default api;
