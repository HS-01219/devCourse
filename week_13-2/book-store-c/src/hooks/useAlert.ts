import { useCallback } from "react"

// 추후 디자인 또는 라이브러리를 적용할 때 해당 파일만 수정하면 되도록
// hook을 만들어서 관리 
export const useAlert = () => {
    const showAlert = useCallback((message : string) => {
        window.alert(message);
    }, []);

    const showConfirm = useCallback((message : string, onConfirm : () => void) => {
        if(window.confirm(message)) {
            onConfirm();
        }
    }, []);

    return { showAlert, showConfirm };
}