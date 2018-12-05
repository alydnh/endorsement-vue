const port = '3000';
// const target = 'http://10.108.52.27:8888';

// 引入 `express` 模块
const express = require('express');
// 引入代理中间件
// const proxy = require('http-proxy-middleware');
// 引入path
const path = require('path');
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例。
const app = express();

// dist是build完的静态文件index.html的路径
app.use(express.static(path.join(__dirname, 'dist')));

// Add middleware for http proxying
// 将服务器代理到target
// const apiProxy = proxy('/', {
//   target,
//   changeOrigin: true,
// });

// /子目录下的都是用代理
// app.use('/', apiProxy);

// 定义好我们 app 的行为之后，让它监听本地的 port 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(port, () => {
  console.log('app is listening at port ' + port);
});
