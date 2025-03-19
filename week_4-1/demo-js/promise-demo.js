
// Promise "객체" : 약속을 지키는 친구

// 객체 선언
// 매개변수로 함수를 받음 (resolve와 reject를 가지는 함수)
let promise = new Promise(function(resolve, reject) {
    // executor : 이 약속이 해내야 하는 일
    // 할 일을 성공적으로 하면 resolve(결과)
    // 할 일을 실패하면 (에러가 발생하면) reject(에러)
    // 프로미스에 resolve 또는 reject의 매개가 담김 -> 결과 또는 에러 전달

    setTimeout(() => {resolve("완료!")},3000);
});

// promise의 기본 메소드
// promise가 일을 끝낸 뒤 호출하는 함수
// 성공이면 첫번째 매개(resolve), 실패하면 두번째 매개(reject) 실행
promise.then(
    function(result){ console.log(result) }, 
    function(error){}
);