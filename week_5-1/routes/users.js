// 주석은 설명이 필요한 코드에만 작성해야 한다.
// 학습용으로 주석을 지우지 않고 남겼지만 필요 없는 주석은 리팩토링 때 지우는게 좋다.

const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json());

router.post("/login", (req, res) => {
    const {email, pwd} = req.body;

    if(email && pwd) {
        // 해당 내용이 sql이라는 것을 알려주기 위해 변수를 명명해 사용
        // 꼭 중복 내용이 아니더라도 다른 사람에게 알려주는 용도로 변수를 사용할 수 있다.
        const sql = `SELECT * FROM users WHERE email = ?`;
        conn.query(
            sql, [email], function(err, results) {
                const loginUser = results[0];
                // if(loginUser) {
                //     const checkPwd = matchPwd(loginUser, pwd);
                //     res.status(checkPwd.status).json({
                //         message : checkPwd.msg
                //     });
                // } else {
                //     res.status(404).json({
                //         message : "회원 정보가 없습니다."
                //     });
                // }

                // 요즘 방식은 user 정보가 없을 경우 무조건 아이디 또는 비밀번호 확인 문구
                if(loginUser && loginUser.password === pwd) {
                    res.status(200).json({
                        message : `${loginUser.name}님, 환영합니다!`
                    });
                } else {
                    res.status(404).json({
                        message : "이메일 또는 비밀번호가 틀렸습니다."
                    });
                }
            }
        );
    } else {
        res.status(400).json({
            message : `입력 값을 다시 확인해주세요.`
        });
    }
});

router.post("/join", (req, res) => {
    const {email, name, pwd, contact} = req.body;
    
    // req.body != {}, req.body.name !== "" 등의 방법은 속성이 누락되었을 때 검증할 수 없다.
    // 값이 세개 다 존재할 때만 실행 (contact는 필수값이 아님)
    // 화면이 존재한다면 거기서 먼저 return시켜주는 것이 좋을 것 같다.
    if(email && name && pwd) {
        const sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
        const values = [email, name, pwd, contact];
        conn.query(
            sql, values, function(err) {
                // err 는 에러가 발생했을 때 JSON 배열 형태로 에러를 반환한다.
                // code, errno, sqlMessage, sqlState, sql
                if(err) {
                    // 유니크 값 중복 에러 처리
                    if(err.code === "ER_DUP_ENTRY") {
                        res.status(400).json({
                            message : `이미 가입된 회원입니다.`
                        });
                    } else {
                        // 그 외에는 일단 500으로 처리
                        res.status(500).json({
                            message : `회원가입 중 오류가 발생했습니다.`
                        });
                    }
                } else {
                    res.status(201).json({
                        message : `${name}님, 환영합니다.`
                    });
                }
            }
        );
    } else {
        res.status(400).json({
            message : `입력 값을 다시 확인해주세요.`
        });
    }
});

// url이 중복될 경우 route를 이용하면 분기시켜줄 수 있다.
router.route("/users")
    .get((req, res) => {
        let {email} = req.body;
        
        // 파라메터가 들어가는 부분을 ? 로 처리
        // query 의 두번째 매개변수로 배열을 넣어주면 ?에 순서대로 들어간다. 
        // 하나일 경우 email, [email] 둘 다 가능

        const sql = `SELECT * FROM users WHERE email = ?`;
        conn.query(
            sql, [email], function(err, results) {
                if(results.length) {
                    res.status(200).json(results);
                } else {
                    res.status(404).json({
                        message : "회원 정보가 없습니다."
                    });
                }
            }
        );
    })
    .delete((req, res) => {
        let {email} = req.body;

        const sql = `DELETE FROM users WHERE email = ?`;
        conn.query(
            sql, [email], function(err, results) {
                // DELETE 쿼리는 삭제된 row의 개수(affected rows)를 반환한다.
                if(err) {
                    res.status(500).json({
                        message : "삭제 중 오류가 발생했습니다."
                    });
                } else {
                    if(results.affectedRows === 0){
                        res.status(404).json({
                            message : "존재하지 않는 회원입니다."
                        });
                    } else {
                        res.status(200).json({
                            message : `삭제되었습니다. 감사합니다.`
                        });
                    }
                }
            }
        );
    });

/* 리팩토링 이후 안쓰는 함수
// 학습용으로 일단 남겨둠
function isExist(obj) {
    if(obj.constructor === Object) {
        if(Object.keys(obj).length === 0) {
            return false;
        } else {
            return true;
        }
    }
}

function matchPwd(user, pwd) {
    if(user.password === pwd) {
        return { msg : `${user.name}님, 환영합니다!`, status : 200 };
    } else {
        return { msg : `비밀번호를 다시 확인해주세요.`, status : 400 };
    }
}
*/

module.exports = router;