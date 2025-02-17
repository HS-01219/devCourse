const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// request로 받아오는 body 데이터를 json으로 받아오는 미들웨어
// express의 http 외 다른 모듈을 사용하기 위해 서버에 세팅하는게 use
app.use(express.json());
app.post('/test', (req, res) => {
  // body 에 숨겨져서 들어온 데이터를 화면에 뿌려주기
  res.send(req.body.message);
  // res.json(req.body)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});