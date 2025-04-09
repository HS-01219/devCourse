// 일반적인 직원 정보
// 전부 따로 관리하는 것보다 연관된 속성을 하나의 클래스로 만들어서 객체로 관리하는 것이 좋다.
/*
let empName : string;
let empAge : number;
let empJob : string;

function printEmp(empName : string, empAge : number, empJob : string) : void {
    console.log(`${empName}의 나이 : ${empAge}, 직업 : ${empJob}`)
}
*/

class Employee {
    // private 멤버는 변수명 앞에 _를 붙여서 구분하는 것이 관례
    private _empName : string;
    empAge : number;
    empJob : string;

    // getter/setter
    get empName() : string {
        return this._empName;
    }

    set empName(empName : string) {
        this._empName = empName;
    }
    
    // 생성자 함수
    // new Employee로 생성과 동시에 호출됨
    // 선택적 매개변수는 옵셔널 (?)로 표시 가능 -> undefined로 초기화
    // 대신 선택적 매개변수는 항상 마지막에 위치해야 함
    // (중간에 위치한다면 그 뒤에 오는 모든 매개변수는 전부 선택적이어야 함)
    constructor(empName : string, empAge? : number, empJob? : string) {
        this._empName = empName;
        this.empAge = empAge || 0; // 타입스크립트에서는 undefined을 허용하지 않음
        this.empJob = empJob || "무직";
    }

    // 멤버 변수 선언과 생성자를 한번에 처리할 수 있다.
    // 암묵적으로 별도의 초기화 코드 없이 멤버변수 선언과 생성자 할당을 동시에 처리
    // constructor(private _empName : string, public empAge : number, public empJob : string) {

    printEmp = () : void => {
        console.log(`${this._empName}의 나이 : ${this.empAge}, 직업 : ${this.empJob}`)
    }
}

/* 생성자가 없을 때
let emp1 = new Employee();
emp1.empName = "홍길동";
emp1.empAge = 30;
emp1.empJob = "개발자";
emp1.printEmp();
*/

// 생성자가 있을 때
let emp2 = new Employee("홍길동", 30, "개발자");
emp2.printEmp();

// 선택적 생성자
let emp3 = new Employee("김철수");
emp3.printEmp(); 

// 데이터 접근을 제한하기 위해 사용하는 접근 지정자
// public, private, protected

