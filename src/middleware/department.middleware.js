const noDelete = async (ctx, next) => {
  const { departmentId } = ctx.params;

  if (departmentId <= 9) {
    return (ctx.body = {
      code: 0,
      message: "小于9的部门id不能删除！",
    });
  }

  await next();
};

const noUpdate = async (ctx, next) => {
  const { departmentId } = ctx.params;

  if (departmentId <= 9) {
    return (ctx.body = {
      code: 0,
      message: "小于9的部门id不能修改！",
    });
  }

  await next();
};

module.exports = { noDelete, noUpdate };
