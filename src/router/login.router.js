const koaRouter = require("@koa/router");
const { verifLogin, verifyTkoen } = require("../middleware/login.middleware");
const { sign, test } = require("../controller/login.controller");

const loginRouter = new koaRouter({ prefix: "/login" });

loginRouter.post("/", verifLogin, sign);
loginRouter.get("/test", verifyTkoen, test);

module.exports = loginRouter;
