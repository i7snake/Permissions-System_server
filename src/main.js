// 导入app
const app = require("./app");
const { SERVER_PORT } = require("./config/server");
require("./utils/handle.error"); // 错误集中处理

//开启koa服务器
app.listen(SERVER_PORT, () => {
  console.log("koa服务器开启成功！");
});
