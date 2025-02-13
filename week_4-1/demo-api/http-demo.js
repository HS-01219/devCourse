let http = require('http'); // node.js가 가지고 있는 http 모듈을 가져와(require) 사용

function onRequest(request, response){
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Hello Node.js');
    response.end();
}

http.createServer(onRequest).listen(8888);