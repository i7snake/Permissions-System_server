const connection = require("../app/database");

class MenuService {
  async getMenuList() {
    const sql = `SELECT * FROM menu;`; // 查询菜单数据 代码进行查询菜单完整树
    const [reslut] = await connection.execute(sql);

    const menuItems = {};
    reslut.forEach((row) => {
      menuItems[row.menuId] = {
        ...row,
        children: [], // 初始化children为数组
      };
    });

    const rootItems = [];
    Object.values(menuItems).forEach((item) => {
      if (item.parentId === null) {
        rootItems.push(item);
      } else {
        const parent = menuItems[item.parentId];
        parent.children.push(item);
      }
    });

    const list = JSON.stringify(
      { code: 0, data: { list: rootItems } },
      null,
      2
    );
    const res = JSON.parse(list);
    return res;
  }

  async getMenuId(menuId) {
    const [reslut] = await connection.execute(
      ` SELECT * FROM menu WHERE menuId = ?;`,
      [menuId]
    );
    return reslut;
  }
}

module.exports = new MenuService();
