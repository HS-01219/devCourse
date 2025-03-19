
// async-await : Promise 객체를 더 쉽고 편하게 사용할 수 있는 문법
// 비동기 처리가 쉽다!

// async 함수
// function f() {} : 일반 함수
// async function f() {} : async 함수

async function f() {
    return 7; // Promise 객체를 반환
    // 반환값이 Promise가 아니라면 Promise.resove(7) 로 자동으로 변환
}

f().then(
    function(result) {
        console.log("promise reject : " + result);
    },
    function (error) {
        console.log("promise reject : " + error);
    }
)