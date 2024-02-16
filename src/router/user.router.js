const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  verifyUser,
  handlePassword,
  noDelete,
  noUpdate,
} = require("../middleware/user.middleware");
const {
  create,
  remove,
  change,
  getUserId,
  getUserList,
  changePassword
} = require("../controller/user.controller");

const usersRouter = new koaRouter({ prefix: "/users" });

// 创建用户
usersRouter.post("/", verifyTkoen, verifyUser, handlePassword, create);
// 删除用户
usersRouter.delete("/:userId", verifyTkoen, noDelete, remove);
// 修改用户
usersRouter.patch("/:userId", verifyTkoen, noUpdate, change);
// 查询某个用户
usersRouter.get("/:userId", verifyTkoen, getUserId);
// 查询用户列表
usersRouter.post("/list", verifyTkoen, getUserList);

//密码修改
usersRouter.post('/change/pwd',verifyTkoen, changePassword)

module.exports = usersRouter;
