import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassCom from './ClassCom';
import FuncCom from './FuncCom';
import TodoList from './Todolist';
import Clock from './Timer';
// import MyWeather from './MyWeather';

function App() {
  return (
    <div className="container">
      <TodoList />
      <Clock />
      {/* <MyWeather weather="맑음" /> props 전달 */}
      {/* <MyWeather weather="맑음">children</MyWeather> */}
    </div>
  )
}

/* react 연습용 코드 주석처리
function App() {
  // javascript 코드를 작성하는 부분
  let name = "React"; // jsx 내부에서 변수를 사용하기 위해서는 {} 로 감싸줘야 한다.
  const port = undefined;

  // 인라인 스타일링
  // css 파일과 달리 대시 (-) 대신 카멜케이스를 사용한다.
  const style = {
    backgroundColor : 'black',
    color : 'white',
    fontSize : '48px',
    fontWeight : 'bold',
    padding : '20px'
  }

  return (
    <div style = {style}>
      // 주석 { 외부에서 작성한 객체를 사용하여 스타일링 }
      <h1 style = {
        {
          // 인라인 스타일링 방법 두가지 중 하나,
          // 내부에 직접 객체를 작성하는 방법
        }
      }>Hello, {name} !!</h1>
      {
        // 조건문을 사용할 수는 없지만, 삼항연산자를 이용하여 조건부 출력 가능
        // 만약 출력을 원하지 않을 경우 null
        name === "리액트" ? (<h1>YES</h1>) : (<h1>NO</h1>)
      }

      {
        // 단축평가를 통해 값이 있는지 없는지 판단하여 출력 가능
        port || "포트가 지정되지 않았습니다."
      }
      <ClassCom />
      // 주석 { 외부에서 작성한 컴포넌트 사용 }
      <FuncCom />
    </div>
  );
}
*/

/* 위와 동일한 내용을 출력하는 코드
 * 사용자에게 조금 더 친숙한 형태로 작성된 코드가 jsx 문법이다.
function App() {
  return React.createElement('div', null, "Hello, React !!",
    React.createElement('p', null, "반갑습니다.")
  )
}
*/

export default App;
