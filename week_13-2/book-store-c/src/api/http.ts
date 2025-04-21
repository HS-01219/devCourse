import { AxiosInstance } from './../../node_modules/axios/index.d';
import axios, { AxiosRequestConfig } from "axios";

// 모든 요청에 base로 들어가는 url 지정
const BASE_URL = "http://localhost:5000";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const AxiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout : DEFAULT_TIMEOUT,
        headers : {
            "Content-Type" : "application/json",
        },
        withCredentials : true,
        ...config
    });

    AxiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });

    return AxiosInstance;
};

export const httpClient = createClient();