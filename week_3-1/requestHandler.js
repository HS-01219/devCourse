function main(response) {
    console.log('main');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Main Page');
    response.end();
}

function login(response) {
    console.log('login');
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Login Page');
    response.end();
}

let handle = {};    // key:value
handle['/'] = main;
handle['/login'] = login;

exports.handle = handle;