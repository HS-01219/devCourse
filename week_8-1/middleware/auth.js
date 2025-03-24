const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const ensureAuthorization = (req) => {
    try {
        const receivedJwt = req.headers["authorization"];

        // 토큰이 들어오는 경우와 안들어오는 경우를 구분
        if(receivedJwt) {
            const decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
            return decodedJwt;
        } else {
            // 토큰이 없을 경우
            // return receivedJwt; // 그냥 undefined를 return
            throw new ReferenceError("jwt must be provided"); // 레퍼런스 에러를 발생시킴
        }
    } catch(err) {
        console.log(err.name);
        console.log(err.message);
        return err;
    }
}

module.exports = ensureAuthorization;