const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permissions.middleware");
const { create, reply, remove,getLatestReplies } = require("../controller/comment.controller");

const commentRouter = new koaRouter({ prefix: "/comment" });

// 添加评论
commentRouter.post("/", verifyTkoen, create);
// 回复评论
commentRouter.post("/reply", verifyTkoen, reply);
// 删除评论
commentRouter.delete("/:commentId", verifyTkoen, verifyPermission, remove);
// 获取评论
commentRouter.get('/reply',verifyTkoen, getLatestReplies)

module.exports = commentRouter;
