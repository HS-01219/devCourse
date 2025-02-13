const express = require('express');
const app = express();

app.listen(3000); 

let db = new Map();
db.set(1, "NoteBook"); // (key,  value) 를 찾을 수 있는 한 쌍을 저장
db.set(2, "Cup");
db.set(3, "Chair");

console.log(db)

console.log(db.get(1)); // get의 매개변수로 키값을 넣으면 value값 반환
console.log(db.get(2));
console.log(db.get(3));

app.get('/:id', function (req, res) {
    const {id} = req.params;

    if(db.get(parseInt(id)) == undefined) {
        res.json({
            message : "없는 상품입니다."
        });
    } else {
        res.json({
            id : id,
            productName : db.get(parseInt(id))
        });
    }
});
