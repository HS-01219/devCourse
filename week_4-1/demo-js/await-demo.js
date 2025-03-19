
// async-await : Promise 객체를 더 쉽고 편하게 사용할 수 있는 문법
// 비동기 처리가 쉽다!

// await은 async 함수 안에서만 동작한다!
// await은 Promise 객체.then()을 좀 더 쉽게 하용할 수 있는 방법

// async의 첫번째 기능 : 자동으로 Promise 객체를 반환
// await을 만난 async의 두번째 기능 : async 함수 내부에서 promise 객체를 기다려줌

async function f() {
    // promise 객체 하나 당 conn.query 하나
    let promise1 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve("첫번째 쿼리!")},3000);
    });

    let result1 = await promise1;
    // promise 객체가 일을 다 수행할 때까지 기다려줌
    console.log(result1)
    
    // promise 객체 하나 당 conn.query 하나
    let promise2 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve("두번째 쿼리! with " + result1)},3000);
    });

    let result2 = await promise2;
    console.log(result2)

    // promise 객체 하나 당 conn.query 하나
    let promise3 = new Promise(function(resolve, reject) {
        setTimeout(() => {resolve("세번째 쿼리! with " + result2)},3000);
    });

    let result3 = await promise3;
    console.log(result3)
}

f();