const express = require('express'); // express 모듈 호출
const app = express();  // createServer 대신 express()를 호출해서 변수에 담아줌
const dotenv = require('dotenv');
dotenv.config();

// get이라는 함수는 매개로 url, 콜백함수를 받는다. -> 서버에 셋팅
// 메소드 GET + "/"
app.get('/', function (req, res) {  // '/' url로 접근했을 때 
  res.send('Hello World');  // body에 Hello World
});

let nodejsBook = {
    title : 'Node.js를 공부해보자',
    price : 20000,
    description : '이 책 좋음 왜? 김송아가 지음'
}

app.get('/products/1', function (req, res) {
    // 3 객체 변수로 전달
    res.json(nodejsBook);

    // 2 json 전달
    // res.json({
    //     title : 'Node.js를 공부해보자',
    //     price : 20000,
    //     description : '이 책 좋음 왜? 김송아가 지음'
    // });

    // 1 text 전달달
    // res.send('Node.js를 배워보자');
});

app.listen(process.env.PORT); // 포트번호 3000으로 설정