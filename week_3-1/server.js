let http = require('http'); // node.js가 가지고 있는 http 모듈을 가져와(require) 사용
let url = require('url');

function start(route, handle) {
    function onRequest(request, response){
        let pathname = url.parse(request.url).pathname;
        route(pathname, handle, response);
    }
    
    http.createServer(onRequest).listen(8888);
    // localhost:8888
}

exports.start = start;