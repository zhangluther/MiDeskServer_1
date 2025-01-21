const express = require('express');
const app = express();
const port = 3000;
// 处理 GET 请求
app.get('/', (req, res) => {
  res.send('Hello World！');
});
// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 // 启动服务器`);
});
