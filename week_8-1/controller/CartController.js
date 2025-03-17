const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const addToCart = (req, res) => {
    const {bookId, quantity, userId} = req.body;
    const sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)`;
    const values = [bookId, quantity, userId];
    conn.query(sql, values, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
        return res.status(StatusCodes.CREATED).json(results);
    });
}

const getCartItems = (req, res) => {
    const {userId, selected} = req.body;
    // selected = [1, 3] 배열의 형태
    let sql = `SELECT C.id, book_id, title, summary, quantity, price 
                 FROM cartItems C LEFT JOIN books B ON C.book_id = B.id
                 WHERE  C.user_id = ?`;
    let values = [userId];

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

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}