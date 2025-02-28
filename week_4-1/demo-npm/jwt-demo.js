var jwt = require('jsonwebtoken'); // jwt 모듈 소환
var dotenv = require('dotenv'); // dotenv 모듈 소환
dotenv.config(); // dotenv 설정 사용하겠다.

var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
// sign() : 토큰 생성 (서명)
// 첫번째 인자는 토큰에 넣을 데이터(페이로드), 두번째 인자는 비밀키
// 비밀키는 나만의 암호키, 서버에서만 알고 있어야 한다.
// 암호화 알고리즘은 기본적으로 SHA256
console.log(token);

// 토큰 검증
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
// verify() : 토큰 검증
// 첫번째 인자는 검증할 토큰, 두번째 인자는 비밀키
console.log(decoded);
// 토큰이 만료되었을 때는 에러가 발생한다.
