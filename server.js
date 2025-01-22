const express = require('express');
const config=require('./config/server.js');


const app = express();
// const port = 3000;
const port=config.port;

// 静态资源文件夹
app.use(express.static(config.staticDir));
// 处理 GET 请求
app.get('/', (req, res) => {
  res.send('Hello World！');
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口${port}`);
});
