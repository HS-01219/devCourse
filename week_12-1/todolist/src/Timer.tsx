import { useState } from 'react';

// const Timer : React.FC = () => {
//     const [seconds, setSeconds] = useState<number>(0);

//     return (
//         <div>
//             <h2>타이머 : {seconds}초</h2>
//             <button onClick={() => {
//                 // 두번째 매개로 받은 시간마다 함수를 실행
//                 setInterval(() => {
//                     setSeconds((prev) => prev + 1);
//                 }, 1000);
//             }}>시작</button>
//         </div>
//     )
// }

const Clock : React.FC = () => {
    const [time, setTime] = useState(new Date());

    setInterval(() => {
        setTime(new Date());
    }, 1000);

    return (
        <div>
            <h2>현재 시간 : {time.toLocaleTimeString()}</h2>
        </div>
    )
}

export default Clock;