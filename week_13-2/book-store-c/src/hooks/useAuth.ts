import { LoginProps } from "@/pages/Signup";
import { useAuthStore } from "@/store/authStore"
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { useState } from "react";

export const useAuth = () => {
    const navigate = useNavigate();
    const {showAlert} = useAlert();

    const { storeLogin } = useAuthStore();

    const userLogin = (data : LoginProps) => {
        login(data).then((res) => {
            storeLogin(res.token);
            showAlert("로그인이 완료되었습니다.");
            navigate("/");
        }, (error) => {
            showAlert("로그인이 실패했습니다.");
        });
    };

    const userSignup = (data : LoginProps) => {
        signup(data).then((res) => {
            showAlert("회원가입이 완료되었습니다.");
            navigate("/login");
        }); 
    };

    const userResetPassword = (data : LoginProps) => {
        resetPassword(data).then(() => {
            showAlert("비밀번호가 초기화되었습니다.");
            navigate("/login");
        });
    };

    const [resetRequested, setResetRequested] = useState(false);

    const userResetRequest = (data : LoginProps) => {
        resetRequest(data).then(() => {
            setResetRequested(true);
        });
    };

    return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };
}