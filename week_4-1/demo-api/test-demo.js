const express = require('express'); // express 모듈 호출
const app = express();  // createServer 대신 express()를 호출해서 변수에 담아줌

// API : GET + "http://localhost:3000/test"
// "TEST SUCCESS"
app.get('/test', function (req, res) { 
    res.send('TEST SUCCESS'); 
});

// API : GET + "http://localhost:3000/test/1"
// "ONE!!"
app.get('/test/1', function (req, res) { 
    res.send('ONE!!'); 
});


app.listen(3000); // 포트번호 3000으로 서버에 셋팅팅