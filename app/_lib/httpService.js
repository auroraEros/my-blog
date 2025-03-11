import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
const http = {
  get: (...args) => app.get(...args),
  patch: (...args) => app.patch(...args),
  put: (...args) => app.put(...args),
  delete: (...args) => app.delete(...args),
  post: (...args) => app.post(...args),
};

app.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

app.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          { withCredentials: true }
        );
        if (data) return app(originalConfig);
      } catch (err) {
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  }
);

export default http;
