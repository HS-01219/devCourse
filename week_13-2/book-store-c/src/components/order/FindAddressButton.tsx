import { styled } from 'styled-components';
import Button from '../common/Button';
import { useEffect } from 'react';

interface Props {
    onCompleted : (address : string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function FindAddressButton({onCompleted} : Props) {
    // 스크립트 로드 (daum postcode)
    useEffect(() => {
        const script = document.createElement("script"); // 스크립트 태그 생성
        script.src = SCRIPT_URL;
        script.async = true;
        document.head.appendChild(script);

        // 화면에서 주소찾기가 사라지면 제거
        return () => {
            document.head.removeChild(script);
        }
    }, []);

    // 핸들러
    const handleOpen = () => {
        new window.daum.Postcode({
            oncomplete : (data : any) => {
                onCompleted(data.address as string);
            }
        }).open();
    }

    return (
        <Button type="button" size='medium' scheme='normal' onClick={handleOpen}>주소 찾기</Button>
    );
}

const FindAddressButtonStyle = styled.div``;

export default FindAddressButton;