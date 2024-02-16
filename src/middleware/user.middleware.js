const userService = require("../service/user.service");
const md5Password = require("../utils/md5.password");

const verifyUser = async (ctx, next) => {
  // 验证客户端传递过来的数据是否符合
  // 1 将数据真正存储到数据库前 还需要判断是否完整
  try {
    const { name, realname, password, cellphone, roleId, departmentId } =
      ctx.request.body;
    if (
      !name ||
      !realname ||
      !password ||
      !cellphone ||
      !roleId ||
      !departmentId
    ) {
      return ctx.app.emit("error", "user_is_complete", ctx);
    }
    // 2 判断用户是否存在
    const isUser = await userService.findUserName(name);
    if (isUser.length) {
      return ctx.app.emit("error", "user_is_exist", ctx);
    }
    await next();
  } catch (error) {
    ctx.body = `其他错误：${error}`;
  }
};
const handlePassword = async (ctx, next) => {
  //获取密码
  const { password } = ctx.request.body;
  //加密并重新赋值
  ctx.request.body.password = md5Password(password);

  await next();
};

const noDelete = async (ctx, next) => {
  const { userId } = ctx.params;

  if (userId <= 28) {
    return ctx.app.emit("error", "no_delete", ctx);
  }

  await next();
};

const noUpdate = async (ctx, next) => {
  const { userId } = ctx.params;
  if (userId <= 28) {
    return ctx.app.emit("error", "no_update", ctx);
  }
  await next();
};

module.exports = { verifyUser, handlePassword, noDelete, noUpdate };
