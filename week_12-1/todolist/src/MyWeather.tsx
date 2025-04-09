import React, { Component } from "react";

interface MyWeatherProps {
    weather : string;
    children : React.ReactNode; // children은 React에서 제공하는 타입
}

// typescript에서는 props의 타입을 명시해줘야 한다.
// 인터페이스를 이용해서 props의 타입을 정의
const myWeather : React.FC<MyWeatherProps> = (props) => {
    // props 비구조화 할당 가능
    // const {children, weather} = props;

    // 매개를 props로 받지 않고 children, weather로 직접 받을 수 있다.
    return (
        <div>
            {props.children}
            오늘의 날씨는 {props.weather} 입니다.
        </div>
    )
}

/* 클래스 컴포넌트
class MyWeather extends Component<MyWeatherProps> {
    render() {
        // 클래스 컴포넌트에서 props 사용법
        const {children, weather} = this.props;
        return (
            <div>
                {children}
                오늘의 날씨는 {weather} 입니다.
            </div>
        )
    }
}
*/

export default myWeather;