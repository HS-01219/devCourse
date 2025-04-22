import { create } from "zustand";

// 주스탄드는 가지고 있는 상태 정보와 액션함수 관리

interface StoreState {
    isLoggedIn : boolean;
    storeLogin : (token : string) => void;
    storeLogout : () => void;
};

export const getToken = () => {
    // 스토리지에 token이 있으면 해당 데이터, 없으면 null
    const token = localStorage.getItem("token");
    return token;
};

const setToken = (token : string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
    // 초기값 설정
    isLoggedIn : getToken() ? true : false,
    storeLogin : (token : string) => {
        set({isLoggedIn : true});
        setToken(token);
    },
    storeLogout : () => {
        set({isLoggedIn : false});
        removeToken();
    }
}));