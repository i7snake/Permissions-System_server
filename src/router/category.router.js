const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  list,
  create,
  update,
  remove,
  getCategory,
} = require("../controller/category.controller");

const categoryRouter = new koaRouter({ prefix: "/category" });

// 获取类别列表
categoryRouter.post("/list", verifyTkoen, list);
// 获取某条
categoryRouter.get("/:categoryId", verifyTkoen, getCategory);
// 创建
categoryRouter.post("/", verifyTkoen, create);
// 修改
categoryRouter.patch("/:categoryId", verifyTkoen, update);
// 删除
categoryRouter.delete("/:categoryId", verifyTkoen, remove);

module.exports = categoryRouter;
