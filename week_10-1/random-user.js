const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();

app.listen(5000);


console.log(faker.internet.userName()); // 없어진다함
console.log(faker.internet.email());
console.log(faker.internet.password());

// 모듈 내에 여러 카테고리가 있음 (범주)
// faker.범주.호출하고싶은 함수이름

// localhost:3000/fake/users
// 한명의 사용자 정보 랜덤 생성
// email, password, fullName, contact

app.get('/fake/users', (req,res) => {
    res.status(200).json({
        email : faker.internet.email(),
        password : faker.internet.password(),
        fullName : faker.person.fullName(),
        contact : faker.phone.number()
    });
});

// req로 숫자를 받아서, 그 수 만큼 사용자 정보를 생성해주는 API
app.get('/fake/users', (req,res) => {
    const { cnt } = req.query;
    let users = [];

    for(let i = 0; i < cnt; i++) {
        users.push({
            email : faker.internet.email(),
            password : faker.internet.password(),
            fullName : faker.person.fullName(),
            contact : faker.phone.number()
        });
    }

    res.status(200).json(users);
});