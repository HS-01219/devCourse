const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json());

let db = new Map();
var id = 1;

// 채널 개별 생성, 전체 조회
router.route("/")
    .get((req, res) => {
        const {userId} = req.body;

        // 단축평가 - userId가 있을 때만 뒤의 내용을 실행
        // userId && _____
        if(userId){
            const sql = `SELECT * FROM channels WHERE user_id = ?`;
            conn.query(
                sql, [userId], function(err, results) {
                    if(results.length) {
                        res.status(200).json(results);
                    } else {
                        notFoundChannel(res);
                    }
                }
            );
        } else {
            // 값을 보내지 않고 끝낼 때 end()를 사용
            res.status(400).end();
        }
    })
    .post((req, res) => {
        const {name, userId} = req.body;
        // 데이터가 있어도 형식이 맞지 않으면 오류가 발생할 수 있음
        // 유효성 검사를 통해 해결해야한다.
        if(name && userId){
            const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
            const values = [name, userId];
            conn.query(
                sql, values, function(err) {
                    if(err) {
                        res.status(500).json({
                            message : `채널 생성 중 오류가 발생했습니다.`
                        });
                    } else {
                        res.status(201).json({
                            message : `${name}님, 채널을 응원합니다!`
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

// 채널 개별 조회, 수정, 삭제
router.route("/:id")
    .get((req, res) => {
        let {id} = req.params;
        id = parseInt(id);

        const sql = `SELECT * FROM channels WHERE id = ?`;
        conn.query(
            sql, [id], function(err, results) {
                if(results.length) {
                    res.status(200).json(results);
                } else {
                    notFoundChannel(res);
                }
            }
        );
    })
    .put((req, res) => {
        let {id} = req.params;
        id = parseInt(id);

        var channel = db.get(id);

        if(channel){
            const oldTitle = channel.channelTitle;
            const newTitle = req.body.channelTitle;

            channel.channelTitle = newTitle;
            db.set(id, channel);
            
            res.status(200).json({
                message : `채널명이 [${oldTitle}]에서 [${newTitle}]로 변경되었습니다.`
            });
        } else {
            notFoundChannel(res);
        }

    })
    .delete((req, res) => {
        var msg = "";
        var status = 200;

        let {id} = req.params;
        id = parseInt(id);
        
        const channel = db.get(id);
        if(channel){
            db.delete(id);
            if(!db.get(id)) {
                msg = `${channel.channelTitle}이 정상적으로 삭제되었습니다.`;
            } else{
                status = 500;
                msg = `삭제 중 오류가 발생했습니다.`;
            }
        } else {
            status = 404;
            msg = `채널 정보를 찾을 수 없습니다.`;
        }

        res.status(status).json({
            message : msg
        });
    });

function notFoundChannel(res) {
    res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다.`
    });
}

module.exports = router;