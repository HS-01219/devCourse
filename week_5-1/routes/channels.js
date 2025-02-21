// express 모듈 세팅
const express = require("express");
const router = express.Router();

router.use(express.json());

let db = new Map();
var id = 1;

// 채널 개별 생성, 전체 조회
router.route("/")
    .get((req, res) => {
        const {userId} = req.body;
        let channels = [];
        
        // userId가 body에 없을 경우 예외처리
        if(db.size && userId){
            db.forEach((channel, idx) => {
                if(channel.userId === userId){
                    channels.push(channel)
                }
            });

            if(channels.length){
                res.status(200).json(channels);
            } else {
                notFoundChannel(res);
            }
        } else{
            notFoundChannel(res);
        }
    })
    .post((req, res) => {
        var status = 201;
        var msg = "";
        const {channelTitle, userId} = req.body;

        if(channelTitle && userId){
            const currentId = id;
            db.set(id++, req.body);

            if(db.get(currentId)){
                msg = `${db.get(currentId).channelTitle}님, 채널을 응원합니다!`;
            } else {
                status = 500;
                msg = `채널 생성 중 오류가 발생했습니다.`
            }
        } else {
            status = 400;
            msg = `입력 값을 다시 확인해주세요.`    
        }

        res.status(status).json({
            message : msg
        })
    })

// 채널 개별 조회, 수정, 삭제
router.route("/:id")
    .get((req, res) => {
        let {id} = req.params;
        id = parseInt(id);

        const channel = db.get(id);
        if(channel){
            res.status(200).json(channel);
        } else {
            notFoundChannel(res);
        }
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