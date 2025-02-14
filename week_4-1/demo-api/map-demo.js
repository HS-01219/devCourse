const express = require('express');
const app = express();

app.listen(3000); 

let notebook = {
    productName : "Notebook",
    price : 2000000,
    description : "재밌다!"
}

let cup = {
    productName : "Cup",
    price : 3000,
    description : "맛있다!"
}

let chair = {
    productName : "Chair",
    price : 100000,
    description : "편하다!"
}

let poster = {
    productName : "Poster",
    price : 20000,
    description : "예쁘다!"
}


let db = new Map();
// Object 타입 value
db.set(1, notebook); 
db.set(2, cup);
db.set(3, chair);
db.set(4, poster);

// String 타입 value
// db.set(1, "Notebook"); // (key,  value) 를 찾을 수 있는 한 쌍을 저장
// db.set(2, "Cup");
// db.set(3, "Chair");
// db.set(4, "Poster");

console.log(db)

console.log(db.get(1)); // get의 매개변수로 키값을 넣으면 value값 반환
console.log(db.get(2));
console.log(db.get(3));

app.get('/:id', function (req, res) {
    let {id} = req.params;
    id = parseInt(id);
    if(db.get(id) == undefined) {
        res.json({
            message : "없는 상품입니다."
        });
    } else {
        const product = db.get(id);
        // product.id = id;
        product["id"] = id;

        res.json(product);
    }

    // string으로 받았던 map
    // if(db.get(id) == undefined) {
    //     res.json({
    //         message : "없는 상품입니다."
    //     });
    // } else {
    //     res.json({
    //         id : id,
    //         productName : db.get(id)
    //     });
    // }
});
