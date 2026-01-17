import { authService } from "@app/features/auth/services/authService";
import axios, { AxiosError, type AxiosResponse } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL || "",
  withCredentials: true,
  timeout: 20000,
});

apiClient.interceptors.request.use((config) => {
  if (config.headers['Authorization'] === 'true') {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    delete config.headers['Authorization'];
  }

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authService.clearAuthData();
    }
    return Promise.reject(error);
  }
);

export async function request<T = unknown>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
  headers?: Record<string, string>,
  isAuth = false
): Promise<[boolean, T | null, number?]> {
  try {
    const requestHeaders = { ...headers };
    if (isAuth) {
      requestHeaders['X-Require-Auth'] = 'true';
    }
    const response = await apiClient.request<T>({
      method,
      url,
      data,
      headers: requestHeaders,
    });
    return [true, response.data, response.status];
  } catch (error: unknown) {
    console.error("API Error:", error);
    return [false, null];
  }
}

export const api = {
  get: function <T = unknown>(url: string, isAuth = false, headers?: Record<string, string>) {
    return request<T>("get", url, undefined, headers, isAuth);
  },
  post: function <T = unknown>(url: string, data?: unknown, isAuth = false, headers?: Record<string, string>) {
    return request<T>("post", url, data, headers, isAuth);
  },
  put: function <T = unknown>(url: string, data?: unknown, isAuth = false, headers?: Record<string, string>) {
    return request<T>("put", url, data, headers, isAuth);
  },
  patch: function <T = unknown>(url: string, data?: unknown, isAuth = false, headers?: Record<string, string>) {
    return request<T>("patch", url, data, headers, isAuth);
  },
  delete: function <T = unknown>(url: string, data?: unknown, isAuth = false, headers?: Record<string, string>) {
    return request<T>("delete", url, data, headers, isAuth);
  },
  postFormData: function <T = unknown>(url: string, formData: FormData, isAuth = false, headers?: Record<string, string>) {
    return request<T>("post", url, formData, { ...headers, "Content-Type": "multipart/form-data" }, isAuth);
  },
};