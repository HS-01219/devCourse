// map 함수 vs forEach 차이

const arr = [1, 2, 3, 4, 5];

// 배열과 forEach
const foreachArr = arr.forEach((a, b, c) => {
    // 데이터, 인덱스, 전체 데이터
    // console.log(`a : ${a}, b: ${b}, c : ${c}`) // a : 1, b : 0, c : 1,2,3,4,5
    return a * 2;
});

// 배열과 map
const mapArr = arr.map((a, b, c) => {
    // 데이터, 인덱스, 전체 데이터
    // console.log(`a : ${a}, b: ${b}, c : ${c}`) // a : 1, b : 0, c : 1,2,3,4,5
    return a * 2;
});

console.log(`foreach return : ${foreachArr}, map return : ${mapArr}`);
                            // undefined / 2,4,6,8,10

// 결론 : forEach는 return값을 줄 수 없는 단순 반복
// map은 return값을 하나의 배열로 만들어주는 친구