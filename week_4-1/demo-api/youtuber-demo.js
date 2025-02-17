// express 모듈 세팅
const express = require("express");
const app = express();

app.listen(3000);

// 데이터 세팅
let youtuber1 = {
    channelTitle : "뚠뚠",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "윤시원",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let db = new Map();
var id = 1;

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.get("/youtubers/:id", function (req, res) {
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);

    if(youtuber == undefined) {
        res.json({message : "유튜버 정보를 찾을 수 없습니다."});
    } else{
        res.json(youtuber);
    }
});

app.use(express.json());
app.post("/youtubers", (req, res) => {
    db.set(id++, req.body);
    res.json({
        message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다.`
    })
});

app.get("/youtubers", (req, res) => {
    res.json(db)
});