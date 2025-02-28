const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const {body, param, validationResult} = require("express-validator");
// validationResult : 유효성 검사 결과를 담는 객체

router.use(express.json());

// 함수를 변수에 담으면서 모듈화
const errorValidate = (req, res, next) => {
    // 유효성 검사 결과 확인
    const error = validationResult(req);
    if(error.isEmpty()) {
        return next(); // 다음 할 일을 찾아가렴 (배열에 있는 다음 미들웨어 또는 콜백 함수)
    } else {
        // 값을 보내지 않고 끝낼 때 end()를 사용
        // res.status(400).end();

        // return을 이용하여 하단의 코드를 실행하지 않고 바로 종료
        return res.status(400).json(error.array());
    }
}

// 채널 개별 생성, 전체 조회
// 메소드의 첫번째 매개는 콜백함수를 실행하기 전 실행되는 미들웨어
// 미들웨어는 순차적으로 실행되기 때문에 순서가 중요하다.
router.route("/")
    .get([body('userId').notEmpty().isInt().withMessage('숫자입력'), errorValidate], (req, res, next) => {
        const {userId} = req.body;

        // 단축평가 - userId가 있을 때만 뒤의 내용을 실행
        // userId && _____
        const sql = `SELECT * FROM channels WHERE user_id = ?`;
        conn.query(
            sql, [userId], function(err, results) {
                if(err) {
                    return res.status(500).json({ message : `채널 조회 중 오류가 발생했습니다.` });
                }

                if(results.length) {
                    res.status(200).json(results);
                } else {
                    notFoundChannel(res);
                }
            }
        );
    })
    .post([body('userId').notEmpty().isInt().withMessage('숫자입력')
        , body('name').notEmpty().isString().withMessage('문자입력'), errorValidate], (req, res, next) => {

        const {name, userId} = req.body;
        // 데이터가 있어도 형식이 맞지 않으면 오류가 발생할 수 있음
        // 유효성 검사를 통해 해결해야한다.
        const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
        const values = [name, userId];
        conn.query(
            sql, values, function(err) {
                if(err) {
                    return res.status(500).json({ message : `채널 생성 중 오류가 발생했습니다.` });
                }
                
                res.status(201).json({
                    message : `${name}님, 채널을 응원합니다!`
                });
            }
        );
            
    });

// 채널 개별 조회, 수정, 삭제
router.route("/:id")
    .get([param('id').notEmpty().withMessage('채널 id 필요'), errorValidate], (req, res, next) => {

        let {id} = req.params;
        id = parseInt(id);

        const sql = `SELECT * FROM channels WHERE id = ?`;
        conn.query(
            sql, [id], function(err, results) {
                if(err) {
                    return res.status(500).end();
                }
                
                if(results.length) {
                    res.status(200).json(results);
                } else {
                    notFoundChannel(res);
                }
            }
        );
    })
    .put([param('id').notEmpty().withMessage('채널 id 필요')
        , body('name').notEmpty().isString().withMessage('채널명 오류'), errorValidate], (req, res, next) => {
        
        let {id} = req.params;
        id = parseInt(id);
        const {name} = req.body;

        const sql = `UPDATE channels SET name = ? WHERE id = ?`;
        const values = [name, id];
        conn.query(
            sql, values, function(err, results) {
                if(err) {
                    return res.status(500).end();
                }

                if(results.affectedRows === 0) {
                    notFoundChannel(res);
                } else {
                    res.status(200).json({
                        message : `채널명이 [${name}](으)로 변경되었습니다.`
                    });
                }
            }
        );
    })
    .delete([param('id').notEmpty().withMessage('채널 id 필요'), errorValidate], (req, res, next) => {
        
        let {id} = req.params;
        id = parseInt(id);

        const sql = `DELETE FROM channels WHERE id = ?`;
        conn.query(
            sql, [id], function(err, results) {
                if(err) {
                    return res.status(500).end();
                }

                if(results.affectedRows === 0) {
                    notFoundChannel(res);
                } else {
                    res.status(200).json({
                        message : `채널이 정상적으로 삭제되었습니다.`
                    });
                }
            }
        );
    });

function notFoundChannel(res) {
    res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
    });
}

module.exports = router;