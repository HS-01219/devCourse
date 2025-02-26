const mysql = require('mysql2');

// db 연결 정보
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'Youtube',
  dateStrings : true
});

module.exports = connection;