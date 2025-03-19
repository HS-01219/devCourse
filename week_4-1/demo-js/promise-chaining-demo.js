

let promise = new Promise(function(resolve, reject) {
    setTimeout(() => {resolve("완료!")},3000);
}).then(
    function(result){ 
        console.log(result)
        return result + "!!!!!"
    }, 
    function(error){}
).then(
    function(result){ 
        // 이전 then의 return값이 들어옴
        console.log(result) 
        return result + "!!@@@"
    }, 
    function(error){}
).then(
    function(result){ 
        console.log(result) 
    }, 
    function(error){}
);