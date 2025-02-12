const express = require('express');
const app = express();

app.listen(3000); 

app.get('/products/:n', function (req, res) {
    // products/__ 빈칸에 오는 값을 n이라는 변수에 담아줘
    // req.params 에 node.js가 모두 담음
    res.json({
        num : req.params.n
    })
});
