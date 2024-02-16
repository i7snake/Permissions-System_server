const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  noDelete,
  noUpdate,
  noCreate,
} = require("../middleware/menu.middleware");
const {
  getMenuList,
  getMenuId,
  deleteMenu,
  updateMenu,
  createMenu,
} = require("../controller/menu.controller");

// 创建路由
const menuRouter = new koaRouter({ prefix: "/menu" });

// 查询菜单列表(完整树)
menuRouter.post("/list", verifyTkoen, getMenuList);
// 查询某菜单
menuRouter.get("/:menuId", verifyTkoen, getMenuId);
// 删除菜单
menuRouter.delete("/:menuId", verifyTkoen, noDelete, deleteMenu);
// 修改菜单
menuRouter.patch("/:menuId", verifyTkoen, noUpdate, updateMenu);
// 创建菜单
menuRouter.post("/", verifyTkoen, noCreate, createMenu);

module.exports = menuRouter;
