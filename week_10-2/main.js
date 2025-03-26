// 변수 선언 방법 테스트
console.log(a);
try {
    console.log(b);
    console.log(c);
} catch (error) {
    console.log("에러 발생 : " + error.name );
}

var a = 1;
const b = 2;
let c;

/***************************************************************/

// 일급객체의 특징 4가지
// 함수는 매개변수가 될 수 있다.
function foo(arg) {
    arg();
}

function bar() {
    console.log('bar');
}

foo(bar); // bar

// 함수는 함수의 반환값이 될 수 있다.
function foo(arg) {
    return arg;
}

function bar() {
    console.log('bar');
}

foo(bar) // bar()
foo(bar)(); // bar

// 함수는 할당명령문의 대상이 될 수 있다.
// 함수는 동일 비교의 대상이 될 수 있다.
const foo = function(arg) {
    return arg;
}

foo(1); // 1

/***************************************************************/

// 매개변수
// 기본값 매개변수
function foo(arg=10) {
    console.log(arg);
}

foo(); // 10
foo(20); // 20

// 나머지 매개변수
function foo(arg, ...rest) {
    console.log(arg);
    console.log(rest);
}

foo(1,2,3,4,5); // 1, [2,3,4,5]

// arguments 객체
function foo(arg1, arg2, arg3) {
    console.log(arguments);
}

foo(1,2,3); // [1,2,3]

/***************************************************************/

// 함수 생성방식
// 함수 선언문
function sum1(a,b) {
    // 본문 작성
    return a + b;
}

// 함수 표현식
const sum2 = function(a,b) {
    // 본문 작성
    return a + b;
}

// Function 생성자 함수
const sum3 = new Function('a', 'b', 'return a + b');

// 화살표 함수 표현식
const sum4 = (a,b) => {
    // 본문 작성
    return a + b;
};

// sum1 ~ sum4 는 모두 같은 결과를 return한다.

/***************************************************************/

// 함수의 여러가지 형태
// IIFE : 즉시 실행 함수
(function foo() {
    console.log('foo');
})();

// 재귀함수
function foo(arg) {
    if(arg > 0) {
        console.log(arg);
        foo(arg-1);
    }
}

// 중첩함수
function foo(arg) {
    function bar() {
        console.log(arg);
    }
    bar();
}

// 콜백함수
function foo(callback) {
    callback();
}

foo(() => {
    console.log(1);
});