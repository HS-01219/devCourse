import { getToken, removeToken } from '../store/authStore';
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
            Authorization : getToken() ? getToken() : "",
        },
        withCredentials : true,
        ...config
    });

    AxiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        // 토큰 만료 시
        if(error.response.status === 401) {
            removeToken();
            window.location.href = "/login";
            return;
        }

        return Promise.reject(error);
    });

    return AxiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

// 공통 요청 부분
export const requestHandler = async <T>(method : RequestMethod, url: string, payload?: T) => {
    let response;

    switch(method) {
        case "post" :
            response = await httpClient.post(url, payload);
            break;
        case "get" :
            response = await httpClient.get(url);
            break;
        case "put" :
            response = await httpClient.put(url, payload);
            break;
        case "delete" :
            response = await httpClient.delete(url);
            break;
    }

    return response.data;
};