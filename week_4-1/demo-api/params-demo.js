const express = require('express');
const app = express();

app.listen(3000); 

app.get('/products/:n', function (req, res) {
    // products/__ 빈칸에 오는 값을 n이라는 변수에 담아줘
    // req.params 에 node.js가 모두 담음
    res.json({
        num : req.params.n
    })
});

// 유튜브 예제
// 채널 주소 : https://www.youtube.com/@ddeunddeun
// 채널 주소 : https://www.youtube.com/@yoonsiwon
// app.get('/:nickname', function (req, res) {
//     const param = req.params;

//     res.json({
//         channel : param.nickname
//     })
// });

// 영상 클릭 주소 : https://www.youtube.com/watch?v=R8JhMwoZuFo
// 타임라인 클릭 주소 : https://www.youtube.com/watch?v=U2mrhazXXO8&t=419s
app.get('/watch', function (req, res) {
    const q = req.query
    console.log(q)

    const {v, t} = req.query;

    // res.json(q) // 이미 JSON 형태이기 때문에 이렇게 보내도됨
    res.json({
        video : q.v,
        timeline : q.t
    });
});