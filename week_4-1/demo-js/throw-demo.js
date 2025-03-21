
let error = new Error("내장 에러 객체");
let systaxError = new systaxError("구문 에러 발생");
let ReferenceError = new ReferenceError("대입 에러 발생");

console.log(error.name) // Error (지정해줄 수 없음, 생성자 이름)
console.log(error.message) // 내장 에러 객체

// js 입장에선 에러가 아니지만, 우리 입장에선 에러일 수 있음
// 이런 경우 직접 에러를 발생시켜야 함
let string = '{ "num1" : 1 }';

try {
    let json = JSON.parse(string);
    // if로 처리할 경우 우리 기준 에러가 발생했어도 아래에 있는 코드를 모두 읽음
    // -> 낭비!
    if(!json.name) {
        console.log("입력 값에 이름이 없습니다.")
        throw new systaxError("입력 값에 이름이 없습니다.");
        // throw로 에러를 발생시키면 아래 코드를 읽지 않고 catch로 이동
    } else {
        console.log(json.name)
    }

    let name = json.name;
    console.log(name);
} catch (err) {
    console.log(err.name)
    console.log(err.message)
}