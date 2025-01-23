const express = require('express');
const config=require('./config/server.js');
const indexRouter=require('./routes/index');
const logger=require('./middleware/logger');


const app = express();
// const port = 3000;
const port=config.port;

// 静态资源文件夹
app.use(express.static(config.staticDir));
// 使用日志中间件
app.use(logger.reqLogger);

// // 处理 GET 请求
// app.get('/', (req, res) => {
//   res.send('Hello World！');
// });

// router文件中的router
app.use('/',indexRouter);

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口${port}`);
  logger.serverLogger(`服务器运行在端口${port}`)
});
