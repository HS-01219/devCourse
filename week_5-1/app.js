const express = require("express");
const app = express();
app.listen(3000);

const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

app.use("/", userRouter);
// 공통된 url을 여기에 작성하면 실제 router 파일에서는 
// 해당 내용을 작성하지 않아도 됨
app.use("/channels", channelRouter);
