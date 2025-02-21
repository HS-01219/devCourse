// express 모듈 세팅
const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();

// 로그인
router.post("/login", (req, res) => {
    var status = 200;
    var msg = "";
    const {userId, pwd} = req.body;

    // 로그인 아이디와 비밀번호가 제대로 전달되었는지 체크
    if(userId && pwd) {
        // userId가 DB에 저장된 회원인지 체크
        const loginUser = matchId(userId);

        if(isExist(loginUser)){
            // pwd가 user의 pwd와 일치하는지 비교
            const checkPwd = matchPwd(loginUser, pwd);

            msg = checkPwd.msg;
            status = checkPwd.status;
        } else {
            status = 404;
            msg = `존재하지 않는 아이디입니다.`;
        }
    } else {
        status = 400;
        msg = `입력 값을 다시 확인해주세요.`
    }

    res.status(status).json({
        message : msg
    });
    
});

// 회원가입
router.post("/join", (req, res) => {
    var status = 201;
    var msg = "";
    const {userId, name, pwd} = req.body;
    
    // req.body != {}, req.body.name !== "" 등의 방법은 속성이 누락되었을 때 검증할 수 없다.
    // 값이 세개 다 존재할 때만 실행
    // 화면이 존재한다면 거기서 먼저 return시켜주는 것이 좋을 것 같다.
    if(userId && name && pwd) {
        const {userId} = req.body;
        db.set(userId, req.body);

        
        if(db.get(userId)){
            msg = `${db.get(userId).name}님, 환영합니다.`;
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
router.route("/users")
    .get((req, res) => {
        let {userId} = req.body;
    
        const user = db.get(userId);
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
        let {userId} = req.body;
    
        const user = db.get(userId);
        if(user) {
            db.delete(userId);
            if(!db.get(userId)) {
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


function isExist(obj) {
    if(obj.constructor === Object) {
        if(Object.keys(obj).length === 0) {
            return false;
        } else {
            return true;
        }
    }
}

function matchId(userId) {
    let findUser = {};
    db.forEach((user) => {
        if(user.userId === userId) {
            findUser = user;
        }
    });

    // findUser 있으면 findUser, 없으면 빈 객체 return
    return findUser || {};
}

function matchPwd(user, pwd) {
    if(user.pwd === pwd) {
        return { msg : `${user.name}님, 환영합니다!`, status : 200 };
    } else {
        return { msg : `비밀번호를 다시 확인해주세요.`, status : 400 };
    }
}

module.exports = router;