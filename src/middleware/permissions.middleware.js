const { isNull } = require("../service/chat.service");
const { checkResouce } = require("../service/permissions.service");

//验证用户是否有权限变化动态
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user;

  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  // 判断是动态还是回复接口 回复不需要判断动态是否存在
  if (!resourceName === "comment") {
    const isChatId = await isNull(resourceId);
    if (!isChatId) {
      return ctx.app.emit("error", "is_null_chatId", ctx);
    }
  }

  const isPermission = await checkResouce(resourceName, resourceId, id);
  if (!isPermission) {
    return ctx.app.emit("error", "is_no_permission", ctx);
  }
  await next();
};

module.exports = { verifyPermission };
