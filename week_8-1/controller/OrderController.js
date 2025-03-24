// const conn = require("../mariadb");
const mariadb = require('mysql2/promise');
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../middleware/auth");
const jwt = require('jsonwebtoken');

const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password : 'root',
        database: 'Bookshop',
        dateStrings : true
    });

    const authorization = ensureAuthorization(req);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    }

    if(authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }

    const {items, delivery, totalQuantity, totalPrice, firstBookTitle} = req.body;

    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await conn.execute(sql, values);

    const delivery_id = results.insertId;

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
    values = [firstBookTitle, totalQuantity, totalPrice, authorization.id, delivery_id];
    
    [results] = await conn.execute(sql, values);
    const order_id = results.insertId;

    // cartItemId 배열이 담겨있는 items로 book_id, quantity 조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    const [orderItems] = await conn.query(sql, [items]);

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    values = [];
    orderItems.forEach((item) => values.push([order_id, item.book_id, item.quantity]));
    // 이차원 배열을 이용해 벌크로 INSERT
    [results] = await conn.query(sql, [values]);

    const result = await deleteCartItems(conn, items);

    return res.status(StatusCodes.CREATED).json(result);
}

const deleteCartItems = async (conn, items) => {
    const sql = `DELETE FROM cartItems WHERE id IN (?)`;
    return await conn.query(sql, [items]);
}

const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password : 'root',
        database: 'Bookshop',
        dateStrings : true
    });

    const authorization = ensureAuthorization(req);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    }

    if(authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }

    const sql = `SELECT orders.id, created_at, address, receiver, contact, book_title, total_quantity, total_price
                FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id WHERE orders.user_id = ?`;
    const [results] = await conn.query(sql, [authorization.id]);
    return res.status(StatusCodes.OK).json(results)
}

const getOrderDetail = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password : 'root',
        database: 'Bookshop',
        dateStrings : true
    });
    
    const authorization = ensureAuthorization(req);
    
    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    }
    
    if(authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }
    
    const {id} = req.params;
    const sql = `SELECT book_id, title, author, price, quantity
                FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id
                WHERE order_id = ?`;
    const [results] = await conn.query(sql, [id]);
    return res.status(StatusCodes.OK).json(results)
}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}