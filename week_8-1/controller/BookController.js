const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const ensureAuthorization = require("../middleware/auth");
const jwt = require('jsonwebtoken');

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
    let allBooksRes = {};
    const { category_id, news, limit, currentPage } = req.query;
    const offset = limit * (currentPage - 1);

    let sql = `SELECT SQL_CALC_FOUND_ROWS *, 
                    (SELECT COUNT(*) FROM likes 
                     WHERE likes.liked_book_id = books.id) AS likes 
               FROM books WHERE 1 = 1`;
    let values = [];

    if(category_id) {
        sql += ` AND category_id = ?`;
        values.push(category_id);
    }
    
    if (news) sql += ` AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`
    
    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset)
    conn.query(sql, values, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `책 정보 조회 중 오류가 발생했습니다.` });
        }

        if(results.length) {
            results.map((result) => {
                result.pubDate = result.pub_date;
                delete result.pub_date;
            });

            allBooksRes.books = results;
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });

    sql = `SELECT found_rows()`;
    conn.query(sql, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `책 정보 조회 중 오류가 발생했습니다.` });
        }

        allBooksRes.pagenation = {
            currentPage : parseInt(currentPage), 
            totalCount : results[0]["found_rows()"]
        }

        return res.status(StatusCodes.OK).json(allBooksRes);
    });
}

const bookDetail = (req, res) => {

    // 로그인 상태가 아니면 liked 제외
    // 로그인 상태면 liked 추가
    const authorization = ensureAuthorization(req);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    }

    // 토큰 값이 없는 경우에도 JsonWebTokenError에 걸림
    // auth.js에서 분기처리
    if(authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }

    const bookId = parseInt(req.params.id);
    let values = [];
    sql = "";
    
    // 로그인 하지 않은 상태
    if(authorization instanceof ReferenceError) {
        values = [bookId];
        sql = `SELECT B.*, C.name AS category_name,
                        (SELECT COUNT(*) FROM likes 
                         WHERE likes.liked_book_id = B.id) AS likes
                     FROM books B LEFT JOIN category C ON B.category_id = C.id WHERE B.id = ?`;
        
    } else {
        values = [authorization.id, bookId];
        sql = `SELECT B.*, C.name AS category_name,
                        (SELECT COUNT(*) FROM likes 
                         WHERE likes.liked_book_id = B.id) AS likes,
                        (SELECT COUNT(*) FROM likes WHERE user_id = ? AND likes.liked_book_id = B.id) AS liked
                     FROM books B LEFT JOIN category C ON B.category_id = C.id WHERE B.id = ?`;
    }

    conn.query(sql, values, function(err, results) {
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