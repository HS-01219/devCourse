if(true) {
    var num1 = 7;
    const num2 = 3; // 블록 {} 스코프
    let num3 = 5;   // 블록 {} 스코프

    // num2 = 10; 한 번 값을 설정(초기화)하면 변경할 수 없는 상수값
    num3 = 21;  // 초기화 이후 값 변경 가능한 변수

    console.log(num1 + " X " + num2 + " = " + num3);
    console.log(`${num1} X ${num2} = ${num3}`); // 템플릿 문자열 (2015년 이후 사용)
}

console.log(num1)
// console.log(num2)
// console.log(num3)