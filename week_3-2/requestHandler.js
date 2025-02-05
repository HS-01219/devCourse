const fs = require('fs'); // FileSync
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    // mariadb에 query 전달
    mariadb.query('select * from product', function(err, rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();
}

function orderlist(response) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query('select * from orderlist', function(err, rows) {
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write( "<tr>"
                            + "<td>"+element.product_id+"</td>"
                            + "<td>"+element.order_date+"</td>"
                            + "</tr>" );
        });

        response.write("</tbody></table>");
        response.end();
    });
}

function mainCss(response) {
    fs.readFile('./main.css', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/css'});
        response.write(data);
        response.end();
    });
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end();
    });
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query('insert into orderlist values (' + productId + ', "'+ new Date().toLocaleDateString() +'");', function(err, rows){
        console.log(rows);
    });
    response.write(main_view);
    response.end();
}

let handle = {};    // key:value
handle['/'] = main;
handle['/orderlist'] = orderlist;

handle['/order'] = order;

/* 스타일 */
handle['/main.css'] = mainCss;

/* 이미지 경로 */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;