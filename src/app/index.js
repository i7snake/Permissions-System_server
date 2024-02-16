const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router");
const cors = require("@koa/cors");

// 创建koa服务器
const app = new Koa();

// 解决方案二:服务器开启CORS
// 允许所有来源的跨域请求
app.use(cors());
// 或者指定允许的来源
// app.use(cors({ origin: 'https://example.com' }));

// 注册中间件
app.use(bodyParser());
// 自动注册函数
registerRouters(app);

// 导出app
module.exports = app;
