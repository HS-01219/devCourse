// express 모듈 세팅
const express = require("express");
const app = express();

app.use(express.json());
app.listen(3000);

let db = new Map();
var id = 1; // 하나의 객체를 유니크하게 구별하기 위함

// 로그인
app.post("/login", (req, res) => {

});

// 회원가입
app.post("/join", (req, res) => {
    var status = 201;
    var msg = "";
    const {userId, name, pw} = req.body;
    
    // req.body != {}, req.body.name !== "" 등의 방법은 속성이 누락되었을 때 검증할 수 없다.
    // 값이 세개 다 존재할 때만 실행
    // 화면이 존재한다면 거기서 먼저 return시켜주는 것이 좋을 것 같다.
    if(userId && name && pw) {
        const currentId = id;
        db.set(id++, req.body);
        
        if(db.get(currentId)){
            msg = `${db.get(currentId).name}님, 환영합니다.`;
        } else {
            status = 500;
            msg = `회원가입 중 오류가 발생했습니다.`
        }
    } else {
        status = 400;
        msg = `입력 값을 다시 확인해주세요.`
    }

    res.status(status).json({
        message : msg
    })
});

// url이 중복될 경우 route를 이용하면 분기시켜줄 수 있다.
app.route("/users/:id")
    .get((req, res) => {
        let {id} = req.params;
        id = parseInt(id);
    
        const user = db.get(id);
        if(user) {
            res.status(200).json({
                userId : user.userId,
                name : user.name
            });
        } else {
            res.status(404).json({
                message : "회원 정보가 없습니다."
            });
        }
    })
    .delete((req, res) => {
        var msg = "";
        var status = 200;
        let {id} = req.params;
        id = parseInt(id);
    
        const user = db.get(id);
        if(user) {
            db.delete(id);
            if(db.get(id) == undefined) {
                msg = `${user.name}님, 다음에 또 뵙겠습니다.`;
            } else{
                status = 500;
                msg = `삭제 중 오류가 발생했습니다.`;
            }
        } else {
            status = 404;
            msg = "존재하지 않는 회원입니다.";
        }
    
        res.status(status).json({
            message : msg
        });
    });
