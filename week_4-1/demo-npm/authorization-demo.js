var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path : "../.env"});

const express = require('express');
const app = express(); 
app.listen(process.env.PORT); 

// GET + /jwt : 토큰 발행
app.get('/jwt', function (req, res) { 
    // var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
    const token = jwt.sign({
        username : "hheee"
    }, process.env.PRIVATE_KEY, { expiresIn : '5m', issuer : "admin" });
    res.cookie("jwt", token, {httpOnly : true});
    res.send("토큰 발행 완료") 
});

// GET + "/jwt/decoded" : 토큰 검증
app.get('/jwt/decoded', function (req, res) { 
    const recievedToken = req.headers["authorization"];
    console.log(recievedToken)
    var decoded = jwt.verify(recievedToken, process.env.PRIVATE_KEY);

    // 유효기간이 지났을때
    // 500 에러를 내지 말고 예외 처리를 해주어야 함
    // 로그인 세션이 만료되었습니다. 다시 로그인 하세요.
    res.send(decoded); 
});