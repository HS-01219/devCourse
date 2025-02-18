
// forEach(콜백함수)
// 객체(배열)에서 요소를 하나 꺼내서 콜백함수의 매개로 전달하여 호출 -> 다음 요소로 이동
// 콜백함수의 매개변수는 객체인지 배열인지에 따라 순서에 각각 값이 정해져있다.

// 배열과 forEach
const arr = [1, 2, 3, 4, 5];
arr.forEach((a, b, c) => {
    // 데이터, 인덱스, 전체 데이터
    console.log(`a : ${a}, b: ${b}, c : ${c}`) // a : 1, b : 0, c : 1,2,3,4,5
});

// Map과 forEach
let map = new Map();
map.set(7, "seven");
map.set(9, "nine");
map.set(8, "eight");

map.forEach((a, b, c) => {
    // value값, key값, 현재 돌고있는 Map
    console.log(`a : ${a}, b: ${b}, c : ${c}`) // a : seven, b : 7, c : [Object Map]

    // c는 말그대로 Map이기 때문에 내부에서 map관련 함수를 또 사용할 수 있다.
    c.forEach((a,b) => {
        console.log(`a : ${a}, b: ${b}`) // a : seven, b : 7
    });
});

// Object와 forEach
// Object 타입은 배열이 아니기 때문에 forEach를 직접 사용할 수 없음
// Object 라는 javascript의 내장 객체를 이용해 다양하게 응용할 수 있다.

let obj = { a : 1, b : 2, c : 3 };

// Object.keys : 매개로 준 object의 key값을 배열로 변환
console.log(Object.keys(obj)); // ['a', 'b', 'c']
Object.keys(obj).forEach((a, b, c) => {
    // 배열 forEach / 데이터, 인덱스, 전체 데이터
    console.log(`a : ${a}, b: ${b}, c : ${c}`); // a : a, b : 0, c : a,b,c
});

// Object.values : 매개로 준 object의 value값을 배열로 변환
console.log(Object.values(obj)); // [1, 2, 3]
Object.values(obj).forEach((a, b, c) => {
    // 배열 forEach / 데이터, 인덱스, 전체 데이터
    console.log(`a : ${a}, b: ${b}, c : ${c}`) // a : 1, b : 0, c : 1,2,3
});

// Object.entries : 매개로 준 object의 키와 값을 하나의 배열로, 전체 이차원 배열로 변환
console.log(Object.entries(obj)); // [ ['a', 1], ['b', 2], ['c', 3] ]
Object.entries(obj).forEach((a, b, c) => {
    // 요소 (배열), index, 전체 데이터
    console.log(`a : ${a}, b: ${b}, c : ${c}`) // a : a,1, b : 0, c : a,1,b,2,c,3
});