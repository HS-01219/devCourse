import { Component } from "react";

// react의 Component를 상속받은 클래스형 컴포넌트
class ClassCom extends Component {
    // 화면에 보여줄 내용을 정의, return jsx
    render() {
        return (
            <div>
                클래스형 컴포넌트
            </div>
        );
    }
}

export default ClassCom; // 다른 파일에서 사용할 수 있도록 export
                         // (사용할 파일(App.tsx)에서 import)