const noDelete = async (ctx, next) => {
  const { menuId } = ctx.params;
  if (menuId <= 42) {
    ctx.body = {
      code: 0,
      message: "菜单id小于42的不能删除！",
    };
  }
  await next();
};

const noUpdate = async (ctx, next) => {
  const { menuId } = ctx.params;
  if (menuId <= 42) {
    ctx.body = {
      code: 0,
      message: "菜单id小于42的不能修改！",
    };
  }
  await next();
};

const noCreate = async (ctx, next) => {
  ctx.body = {
    code: 0,
    message: "对不起，无法创建菜单，请管理员进行数据库操作菜单！",
  };

  await next();
};

module.exports = { noDelete, noUpdate, noCreate };
