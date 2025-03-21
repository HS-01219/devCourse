
// 단독으로 작성 후 실행하면 ReferenceError
// username;

try {
    username;
} catch (err) {
    console.log("username이 선언되지 않았습니다.")
    console.log("발생한 오류는 다음과 같습니다.")
    console.log(err);
}

let string = '{ "num1" : 1 ';

try {
    let json = JSON.parse(string);
    console.log(json);
} catch (err) {
    // catch가 받아오는 err는 내장 에러 "객체"
    // name과 message를 가지고 있음
    console.log(err.name)
    console.log(err.message)
    console.log(err);
}

// 개발자가 예상하지 못한 (처리하지 않은) 모든 에러가 catch에 잡힌다.
// 에러가 100개가 발생해도 자동으로 catch가 잡아주기 때문에
// if문을 무한정 만들지 않아도 된다.