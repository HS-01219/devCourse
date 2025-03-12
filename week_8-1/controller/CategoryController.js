const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const allCategory = (req, res) => {
    const sql = `SELECT * FROM category`;
    conn.query(sql, function(err, results) {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
}

module.exports = { allCategory };