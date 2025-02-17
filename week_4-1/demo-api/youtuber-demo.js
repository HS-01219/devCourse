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

    if(youtuber == undefined) {
        res.json({message : "유튜버 정보를 찾을 수 없습니다."});
    } else{
        res.json(youtuber);
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
   
    const currentId = id;
    db.set(id++, req.body);

    const data = db.get(currentId);
    if(data) {
        res.json({
            message : `${data.channelTitle}님, 유튜버 생활을 응원합니다.`
        });
    } else{
        res.json({
            message : `유튜버 등록에 실패했습니다.`
        });
    }
});

app.get("/youtubers", (req, res) => {
    res.json(db)
    // map도 key-value 형태이지만 map은 json이 아니다.
    // 추후 수정
});