function add1(x,y) {
    return x + y;
}

// 모듈화 해서 사용
let add2 = function (x,y) {
    return x + y;
}

// function 대신 => (화살표 함수, arrow function)
const add3 = (x,y) => {
    return x + y;
}

// return 을 바로 작성
var add4 = (x,y) => x + y;

console.log(add1(1,2))
console.log(add2(1,2))
console.log(add3(1,2))
console.log(add4(1,2))