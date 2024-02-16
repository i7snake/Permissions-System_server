const koaRouter = require("@koa/router");
const { verifyTkoen } = require("../middleware/login.middleware");
const {
  queryCount,
  pieCount,
  barCount,
  lineCount,
} = require("../controller/chart.controller");

const chartRouter = new koaRouter({ prefix: "/chart" });
// 图表数据
// 顶部统计
chartRouter.get("/count", verifyTkoen, queryCount);
// 饼图统计
chartRouter.get("/pie/count", verifyTkoen, pieCount);
// 柱状图统计
chartRouter.get("/bar/department", verifyTkoen, barCount);
// 折线图统计
chartRouter.get("/line/chat", verifyTkoen, lineCount);

module.exports = chartRouter;
