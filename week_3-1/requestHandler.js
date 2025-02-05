const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    // mariadb에 query 전달
    mariadb.query('select * from product', function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('Main Page - Choi Hee Soo');
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