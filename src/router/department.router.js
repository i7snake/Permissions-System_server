const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const { noDelete, noUpdate } = require("../middleware/department.middleware");
const {
  create,
  change,
  remove,
  getDepartmentId,
  getDepartmentList,
} = require("../controller/department.controller");

// 创建路由
const departmentRouter = new koaRouter({ prefix: "/department" });

// 创建部门
departmentRouter.post("/", verifyTkoen, create);
// 修改部门
departmentRouter.patch("/:departmentId", verifyTkoen, noUpdate, change);
// 删除部门
departmentRouter.delete("/:departmentId", verifyTkoen, noDelete, remove);
// 查询某个部门
departmentRouter.get("/:departmentId", verifyTkoen, getDepartmentId);
// 查询部门列表
departmentRouter.post("/list", verifyTkoen, getDepartmentList);

module.exports = departmentRouter;
