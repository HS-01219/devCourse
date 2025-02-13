const express = require('express'); // express 모듈 호출
const app = express();  // createServer 대신 express()를 호출해서 변수에 담아줌

// GET / hello, /bye, /nicetomeetyou 각각 다른 결과 호출하기기
app.get('/hello', function (req, res) {
    res.json({
        say : '안녕하세요'
    }); 
});

app.get('/bye', function (req, res) {
    res.json({
        say : '안녕히가세요'
    });
});

app.get('/nicetomeetyou', function (req, res) {
    res.json({
        say : '만나서 반갑습니다'
    });
});

app.listen(3000); // 포트번호 3000으로 설정