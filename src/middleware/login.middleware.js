// 验证登录用户
const { findUserName } = require("../service/user.service");
const md5Password = require("../utils/md5.password");
const JWT = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../config/screctKey");

const verifLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  //1.判断是否为空
  if (!name || !password) {
    return ctx.app.emit("error", "user_is_null", ctx);
  }

  //2.查询该用户是否在数据库中存在
  const users = await findUserName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", "user_is_not_null", ctx);
  }

  // 3.查询数据库中密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", "password_is_error", ctx);
  }

  //4.可以将查到的use放到ctx中(就可以保存每个登录用户的个人信息)
  ctx.user = user;
  await next();
};

// 很多接口需要用到验证token 所以放入中间件中
const verifyTkoen = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    // 有时拿到undefined 需要做判断
    return ctx.app.emit("error", "token_is_void", ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    // 认证token
    const result = JWT.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 保存token信息
    ctx.user = result;
  } catch (error) {
    return ctx.app.emit("error", "token_is_void", ctx);
  }

  await next();
};
module.exports = { verifLogin, verifyTkoen };
