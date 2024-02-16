const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  verifyRoles,
  noDeleteRole,
  noUpdateRole,
} = require("../middleware/role.middleware");
const {
  getRoleMenu,
  getRoleMenuList,
  remove,
  update,
  getRoleId,
  create,
} = require("../controller/role.controller");

// 创建路由
const roleRouter = new koaRouter({ prefix: "/role" });
// 创建角色
roleRouter.post("/", verifyTkoen, verifyRoles, create);
// 查询角色菜单树
roleRouter.get("/:roleId/menu", verifyTkoen, getRoleMenu);
// 查询角色列表
roleRouter.post("/list", verifyTkoen, getRoleMenuList);
// 删除角色
roleRouter.delete("/:roleId", verifyTkoen, noDeleteRole, remove);
// 修改角色
roleRouter.patch("/:roleId", verifyTkoen, noUpdateRole, update);
// 获取角色
roleRouter.get("/:roleId", verifyTkoen, getRoleId);

module.exports = roleRouter;
