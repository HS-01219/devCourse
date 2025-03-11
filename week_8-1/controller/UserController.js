const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const join = (req, res) => {
    const {email, pwd} = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');

    const sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
    const values = [email, hashPassword, salt];
    conn.query(
        sql, values, function(err, result) {
            if(err) {
                console.log(err)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `회원가입 중 오류가 발생했습니다.` });
            }
            return res.status(StatusCodes.CREATED).json(result);
        }
    );
}

const login = (req, res) => {
    const {email, pwd} = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(
        sql, email, function(err, result) {
            if(err) {
                console.log(err)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : `로그인 중 오류가 발생했습니다.` });
            }

            const loginUser = result[0];

            const hashPassword = crypto.pbkdf2Sync(pwd, loginUser.salt, 10000, 10, 'sha512').toString('base64'); 

            if(loginUser && loginUser.password == hashPassword) {
                const token = jwt.sign({ email : loginUser.email }, process.env.PRIVATE_KEY, { expiresIn : '5m', issuer : "hs" });
                res.cookie("token", token, { httpOnly : true, secure : true });
                console.log(token);
                
                return res.status(StatusCodes.OK).json(result);
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message : `아이디 또는 비밀번호가 일치하지 않습니다.` });
            }
        }
    );
}

const requestReset = (req, res) => {
    const {email} = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(
        sql, email, function(err, result) {
            if(err) {
                console.log(err)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
            }

            const user = result[0];
            if(user) {
                return res.status(StatusCodes.OK).json({ email : email });
            } else {
                return res.status(StatusCodes.NOT_FOUND).end();
            }
        }
    );
}

const passwordReset = (req, res) => {
    const {email, pwd} = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');

    
    const sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    const values = [hashPassword, salt, email];
    conn.query(
        sql, values, function(err, result) {
            if(err) {
                console.log(err)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
            }

            if(result.affectedRows) {
                return res.status(StatusCodes.OK).json(result);
            } else {
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
        }
    );
}

module.exports = { join, login, requestReset, passwordReset };