const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const addToCart = (req, res) => {
    const {bookId, quantity} = req.body;
    const authorization = ensureAuthorization(req, res);

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

    const sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
    const values = [bookId, quantity, authorization.id];
    conn.query(sql, values, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
        return res.status(StatusCodes.CREATED).json(results);
    });
}

const getCartItems = (req, res) => {
    const {selected} = req.body;
    // selected = [1, 3] 배열의 형태
    const authorization = ensureAuthorization(req, res);

    // instanceof 좌측이 우측과 같은 모양이니?
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

    let sql = `SELECT C.id, book_id, title, summary, quantity, price 
                 FROM cartItems C LEFT JOIN books B ON C.book_id = B.id
                 WHERE  C.user_id = ?`;
    let values = [authorization.id];

    if(selected) {
        sql += ` AND C.id IN (?)`;
        values.push(selected);
    }

    conn.query(sql, values, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
}

const removeCartItem = (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM cartItems WHERE id = ?`;
    conn.query(sql, id, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
}

function ensureAuthorization(req, res) {
    try {
        const receivedJwt = req.headers["authorization"];
        const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
        return decodedJwt;
    } catch(err) {
        console.log(err.name);
        console.log(err.message);
        return err;
    }
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}