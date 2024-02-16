const verifyRoles = async (ctx, next) => {
  try {
    const { name, intro, menuList } = ctx.request.body;

    if (!name || !intro || !menuList) {
      return ctx.app.emit("error", "is_not_complete", ctx);
    }

    await next();
  } catch (error) {
    ctx.body = "其他错误：" + error;
  }
};

const noDeleteRole = async (ctx, next) => {
  const { roleId } = ctx.params;
  if (roleId <= 5) {
    return ctx.app.emit("error", "no_delete_role", ctx);
  }
  await next();
};

const noUpdateRole = async (ctx, next) => {
  const { roleId } = ctx.params;
  const { name, intro, menuList } = ctx.request.body;

  if (roleId <= 5) {
    return ctx.app.emit("error", "no_update_role", ctx);
  }

  if (!name || !intro || !menuList) {
    return ctx.app.emit("error", "user_is_complete", ctx);
  }
  await next();
};

module.exports = { verifyRoles, noDeleteRole, noUpdateRole };
