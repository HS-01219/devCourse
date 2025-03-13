const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
    const { category_id, news, limit, currentPage } = req.query;
    const offset = limit * (currentPage - 1);

    let sql = `SELECT * FROM books WHERE 1 = 1`;
    let values = [];

    if(category_id) {
        sql += ` AND category_id = ?`;
        values.push(category_id);
    }
    
    if (news) sql += ` AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`
    
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset)
    conn.query(sql, values, function(err, results) {
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
}

const bookDetail = (req, res) => {
    const id = parseInt(req.params.id);

    const sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?`;
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