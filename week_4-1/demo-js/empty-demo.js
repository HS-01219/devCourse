// 빈 객체를 구분하는 방법

const obj1 = {};
const obj2 = { message : "꽉 찼지롱" }


// Object.keys 는 객체의 key값들을 배열로 반환한다.
console.log(Object.keys(obj1))  // []  
console.log(Object.keys(obj2))  // [ 'message' ]

console.log(Object.keys(obj1).length === 0)  // true
console.log(Object.keys(obj2).length === 0)  // false

const num = 1;
const str1 = "one";
const str2 = "";

// 숫자는 Object.keys 사용 불가
console.log(Object.keys(num).length === 0)  // true
// 문자열은 객체이다 !!
console.log(Object.keys(str1).length === 0)  // false
console.log(Object.keys(str2).length === 0)  // true


// 함수를 만들어서 모듈처럼 사용할 수 있음
function isEmpty(obj) {
    if(obj.constructor === Object) {
        if(Object.keys(obj).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}

console.log(isEmpty(obj1))  // true
console.log(isEmpty(obj2))  // false

