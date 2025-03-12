const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allBooks = (req, res) => {
    const {category_id} = req.query;

    if(category_id) {
        const sql = `SELECT * FROM books WHERE category_id = ?`;
        conn.query(sql, category_id, function(err, results) {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `책 정보 조회 중 오류가 발생했습니다.` });
            }

            if(results.length) {
                return res.status(StatusCodes.OK).json(results);
            } else {
                return res.status(StatusCodes.NOT_FOUND).end();
            }
        });
    } else {
        const sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id`;
        conn.query(sql, function(err, results) {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `책 정보 조회 중 오류가 발생했습니다.` });
            }
            return res.status(StatusCodes.OK).json(results);
        });
    }
}

const bookDetail = (req, res) => {
    const id = parseInt(req.params.id);

    const sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE id = ?`;
    conn.query(sql, id, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `책 정보 조회 중 오류가 발생했습니다.` });
        }

        if(results[0]) {
            return res.status(StatusCodes.OK).json(results[0]);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
}

module.exports = { allBooks, bookDetail };