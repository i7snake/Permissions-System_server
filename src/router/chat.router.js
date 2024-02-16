const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  create,
  detail,
  remove,
  update,
  list,
} = require("../controller/chat.controller");
const { verifyPermission } = require("../middleware/permissions.middleware");

const chatRouter = new koaRouter({ prefix: "/chat" });
// 发布动态
chatRouter.post("/", verifyTkoen, create);
// 获取动态列表
chatRouter.post("/list", verifyTkoen, list);
// 获取动态详情
chatRouter.get("/:chatId", verifyTkoen, detail);
// 删除动态
chatRouter.delete("/:chatId", verifyTkoen, verifyPermission, remove);
// 修改动态
chatRouter.patch("/:chatId", verifyTkoen, verifyPermission, update);

module.exports = chatRouter;
