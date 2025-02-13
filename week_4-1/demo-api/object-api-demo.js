const express = require('express');
const app = express();

app.listen(3000); 

// 유튜브 예제
// 채널 주소 : https://www.youtube.com/@ddeunddeun
// 채널 주소 : https://www.youtube.com/@yoonsiwon

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

// let youtuber3 = {
//     channelTitle : "테오",
//     sub : "54.8만명",
//     videoNum : "726개"
// }

app.get('/:nickname', function (req, res) {
    const {nickname} = req.params;

    if (nickname == "@ddeunddeun"){
        res.json(youtuber1);
    } else if(nickname == "@yoonsiwon"){
        res.json(youtuber2);
    } else{
        res.json({
            message : "저희가 모르는 유튜버입니다."
        })
    }
});

// 영상 클릭 주소 : https://www.youtube.com/watch?v=R8JhMwoZuFo
// 타임라인 클릭 주소 : https://www.youtube.com/watch?v=U2mrhazXXO8&t=419s
