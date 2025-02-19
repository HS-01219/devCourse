const express = require('express'); 
const app = express(); 
app.listen(3000);

const fruits = [
    { id : 1, name : 'apple'},
    { id : 2, name : 'orange'},
    { id : 3, name : 'strawberry'},
    { id : 4, name : 'blueberry'}
];

// 과일 전체 조회
app.get("/fruits", function (req, res) {
  // 배열 안에 json이 있는 형태로 전달됨 (json Array)
    res.json(fruits)
});

// 과일 개별 조회
app.get("/fruits/:id", function (req, res) {
    // json Array는 배열이기 때문에 index가 0부터 시작
    let id = req.params.id;

    // 1. id - 1
    // let fruit = fruits[id-1];
    // res.json(fruit)

    // 2. forEach
    // var findFruit = {};
    // fruits.forEach((fruit) => {
    //   if(fruit.id == id) {
    //     findFruit = fruit;
    //   }
    // });
    // res.json(findFruit)

    // 3. find()
    const findFruit = fruits.find(f => (f.id == id));
    // fruits 배열 안에 있는 객체 중, id 값이 params.id와 같은 객체를 찾음
    // f는 fruits 배열 안에 있는 객체 하나하나를 의미
    // 배열 각 요소에 대해 화살표 함수 내용을 실행하고 일치하면 참, 일치하지 않으면 거짓을 반환
    // 참이 반환되면 바로 find 종료 -> 여러개의 값을 return할 수 없다.

    if(findFruit) {
      res.json(findFruit);
    } else {  // http status code를 실패로 (예외를 터뜨린다)
      res.status(404).send("전달주신 id로 저장된 과일이 없습니다.");
      // send 대신 json도 가능 (res.에 status를 설정해줬을 뿐)
    }
});