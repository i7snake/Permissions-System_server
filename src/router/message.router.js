const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  list,
  create,
  update,
  remove,
  getMessage
} = require("../controller/message.controller");

const messageRouter = new koaRouter({ prefix: "/message" });

// 获取信息列表
messageRouter.post("/list", verifyTkoen, list);
messageRouter.get("/:messageId",verifyTkoen,getMessage)
// 创建
messageRouter.post("/", verifyTkoen, create);
// 修改
messageRouter.patch("/:messageId", verifyTkoen, update);
// 删除
messageRouter.delete("/:messageId", verifyTkoen, remove);

module.exports = messageRouter;
