function logName(name : string) {
    console.log(name);
}

logName("chs");

let student = {
	name : 'john',
	course : 'typescript',
	score : 100,
	grade : function() {
		console.log('A');
	}
}

let stdId : number = 1111;
let stdName : string = 'lee';
let age : number = 20;
let gender : string = 'male';
let course : string = 'Typescript';
let completed : boolean = false;

function plus(a : number, b : number) : number {
    return a + b;
}

// 네이밍 컨벤션은 따로 없음
interface Student {
    stdId : number;
	stdName : string;
	age : number;
	gender : string;
	course : string;
	completed : boolean;
}

// interface를 return 타입으로 가지는 함수
// return값은 무조건 interface와 동일한 property를 가져야 함
function getInfo(id : number) : Student {
    return {
        stdId : id,
        stdName : 'lee',
        age : 20,
        gender : 'female',
        course : 'javascript',
        completed : true
    };
}

console.log(getInfo(5678));

function setInfo(student : Student) : void {

}