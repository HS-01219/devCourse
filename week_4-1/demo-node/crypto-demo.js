const crypto = require("crypto");

const pwd = "1234";

const salt = crypto.randomBytes(64).toString('base64');
const hashPassword = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');
// salt : 64바이트 길이의 랜덤 문자열 base64로 인코딩
// hashPassword : pwd를 salt를 이용해 10000번 해싱한 결과를 base64로 인코딩
// 10 : 해싱된 결과의 길이
// sha512 알고리즘 사용

console.log(hashPassword);
// 실행할 때마다 결과가 달라짐 -> salt가 달라지기 때문
// salt가 같으면 같은 결과가 나옴

// 회원가입 시 비밀번호를 암호화해서 암호화된 비밀번호와, salt 값을 같이 저장
// 로그인 시에는 salt 값을 가져와서 암호화해서 DB 비밀번호와 비교
// salt 값이 같으면 같은 결과가 나옴