const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  handleFile,
  deleteOldAvatar,
} = require("../middleware/file.middleware");
const { create, showAvatar } = require("../controller/file.controller");

const fileRouter = new koaRouter({ prefix: "/file" });

// 文件(头像)上传
fileRouter.post("/", verifyTkoen, handleFile, deleteOldAvatar, create);
// 查看头像
fileRouter.get("/users/avatar/:userId", showAvatar);

module.exports = fileRouter;
