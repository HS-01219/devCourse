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
/* var 로 선언한 이유는?
    let은 블록스코프이기 때문에 post로 호출했을 때 내부에서 값을 변경하게 되면
    그 변경된 값은 해당 블록 내부에서만 유효하다.
    -> 바깥의 id값은 계속 4이기 때문에 post를 호출할 때마다 map에 4가 들어가게 됨
    전역이라 상관 없을 줄 알았는데 블록 스코프에 유의하자 !!
*/

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.get("/youtubers/:id", function (req, res) {
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);

    if(youtuber) {
        res.json(youtuber);
    } else {
        res.status(404).json({message : "유튜버 정보를 찾을 수 없습니다."});
    }
});

app.use(express.json());
app.post("/youtubers", (req, res) => {
    // 기존코드
    // db.set(id++, req.body);
    // res.json({
    //     message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다.`
    // });

    /* id값을을 따로 분리한 이유?
        id값을 이미 ++ 했는데 map에서 가져오면서 id-1 하는게 일관성이 떨어져보이고
        코드 구조가 마음에 들지 않음
        또한 map에 제대로 set이 되지 않았을 경우 에러가 발생할 가능성이 있음
    */

    var msg = "";
    var status = 201;

    if(req.body.channelTitle) {
        const currentId = id;
        db.set(id++, req.body);

        const data = db.get(currentId);
        if(data) {
            msg = `${data.channelTitle}님, 유튜버 생활을 응원합니다.`;
        } else{
            status = 500;
            msg = `유튜버 등록에 실패했습니다.`;
        }
    } else {
        status = 400;
        msg = `요청 값을 제대로 보내주세요.`;
    }

    res.status(status).json({
        message : msg
    });
});

app.get("/youtubers", (req, res) => {
    // map도 key-value 형태이지만 map은 json이 아니다.
    // res.json(db) // 1 => { chnnelTitle : '뚠뚠', sub : '593만명', videoNum : '993개' }
    // console.log(db.values()) // [Map Iterator] { { chnnelTitle : '뚠뚠', sub : '593만명', videoNum : '993개' } }
    
    // 변수가 담고 있는 데이터 형태를 변수 이름에 담지는 말자.
    let youtubers = {};

    // if문에 db만 적으면 undefined가 아니다
    // map은 항상 존재한다 요소의 수가 늘어나고 줄어들 뿐
    if(db.size !== 0){
        // forEach 는 index값 없이 순서대로 순회할 수 있음
        db.forEach((youtuber, idx) => {
            youtubers[idx] = youtuber;
        });

        // JSON.stringify : JSON 형태를 문자열로 표현하기 위해 개행 등을 넣어줌
        res.json(youtubers);
    } else{
        res.status(404).json({
            message : "현재 유튜버가 없습니다."
        });
    }
});

app.delete("/youtubers/:id", (req, res) => {
    var msg = "";
    var status = 200;
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);

    if(youtuber) {
        const youtuberNm = youtuber.channelTitle;
        db.delete(id);

        // 제대로 삭제되었는지 확인하기 위해 다음 과정을 추가
        // (현재는 map 하나를 delete한거지만 실제 db연결 시 delete 쿼리를 돌려야 할 것 -> 에러 발생 가능성 있음)
        // 이때 youtuber는 이전 객체가 담겨있기 때문에 새로 get해준다.
        if(db.get(id) == undefined) {
            msg = `${youtuberNm}님, 유튜버 생활을 청산하셨군요. 안녕히가세요.`;
        } else{
            status = 500;
            msg = `삭제 중 오류가 발생했습니다.`;
        }
    } else {
        status = 404;
        msg = `요청하신 ${id}번은 없는 유튜버입니다.`;
    }

    res.status(status).json({
        message : msg
    });
});

app.delete("/youtubers", (req, res) => {
    var msg = "";
    var status = 200;

    if(db.size > 0){
        db.clear();
        // (현재는 map을 clear한거지만 실제 db연결 시 delete 쿼리를 돌려야 할 것 -> 에러 발생 가능성 있음)
        if(db.size === 0){
            msg = "전체 유튜버가 삭제되었습니다.";
        } else {
            status = 500;
            msg = "삭제 중 오류가 발생했습니다.";
        }
    } else {
        status = 404;
        msg = "삭제할 유튜버가 없습니다.";
    }

    res.status(status).json({
        message : msg
    });
});

app.put("/youtubers/:id", (req, res) => {
    var msg = "";
    var status = 200;

    let {id} = req.params;
    id = parseInt(id);

    // 다른 블록에서 변경되어야 하는 객체라 var 선언
    var youtuber = db.get(id);

    if(youtuber){
        // youtuber 객체가 있을 때만 가져올 수 있는 데이터이기 때문에 else 안에 작성
        const oldTitle = youtuber.channelTitle;
        const newTitle = req.body.channelTitle;

        // youtuber.channelTitle = newTitle;
        youtuber["channelTitle"] = newTitle;
        db.set(id, youtuber);
        msg = `${oldTitle}님, 채널명이 ${newTitle}로 변경되었습니다.`;
    } else {
        status = 404;
        msg = `요청하신 ${id}번은 없는 유튜버입니다.`;
    }

    res.status(status).json({
        message : msg
    });
});