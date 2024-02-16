const { getMenuList, getMenuId } = require("../service/menu.service");
class MenuController {
  async getMenuList(ctx, next) {
    const reslut = await getMenuList();
    ctx.body = reslut;
  }
  async getMenuId(ctx, next) {
    const { menuId } = ctx.params;

    const reslut = await getMenuId(menuId);

    ctx.body = {
      code: 0,
      data: reslut[0],
    };
  }
  async deleteMenu(ctx, next) {}
  async updateMenu(ctx, next) {}
  async createMenu(ctx, next) {}
}

module.exports = new MenuController();
