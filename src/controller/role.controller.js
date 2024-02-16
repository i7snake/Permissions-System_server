const {
  getRoleMenu,
  getRoleMenuList_1,
  getRoleMenuList_2,
  remove,
  update,
  getRoleId,
  create,
} = require("../service/role.service");

class RoleController {
  async create(ctx, next) {
    const { name, intro, menuList } = ctx.request.body;

    const result = await create(name, intro, menuList);

    ctx.body = {
      code: 0,
      message: "创建成功！",
    };
  }

  async getRoleMenu(ctx, next) {
    const { roleId } = ctx.params;

    const result = await getRoleMenu(roleId);

    ctx.body = result;
  }

  async getRoleMenuList(ctx, next) {
    const { offset, size, name, intro } = ctx.request.body;

    let result;
    if (!name && !intro) {
      result = await getRoleMenuList_1(offset, size);
    } else {
      result = await getRoleMenuList_2(offset, size, name, intro);
    }

    ctx.body = {
      code: 0,
      data: result,
    };
  }
  async getRoleId(ctx, next) {
    const { roleId } = ctx.params;

    const result = await getRoleId(roleId);

    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async remove(ctx, next) {
    const { roleId } = ctx.params;
    const result = await remove(roleId);

    ctx.body = {
      code: 0,
      message: "删除角色成功！",
    };
  }
  async update(ctx, next) {
    const { roleId } = ctx.params;
    const { name, intro, menuList } = ctx.request.body;

    const result = await update(roleId, name, intro, menuList);

    ctx.body = {
      code: 0,
      message: "修改角色成功！",
    };
  }
}

module.exports = new RoleController();
