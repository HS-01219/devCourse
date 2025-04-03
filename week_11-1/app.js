"use strict";
function logName(name) {
    console.log(name);
}
logName("chs");
let student = {
    name: 'john',
    course: 'typescript',
    score: 100,
    grade: function () {
        console.log('A');
    }
};
let stdId = 1111;
let stdName = 'lee';
let age = 20;
let gender = 'male';
let course = 'Typescript';
let completed = false;
function plus(a, b) {
    return a + b;
}
// interface를 return 타입으로 가지는 함수
// return값은 무조건 interface와 동일한 property를 가져야 함
function getInfo(id) {
    return {
        stdId: id,
        stdName: 'lee',
        age: 20,
        gender: 'female',
        course: 'javascript',
        completed: true
    };
}
console.log(getInfo(5678));
