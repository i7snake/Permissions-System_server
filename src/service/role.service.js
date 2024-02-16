const connection = require("../app/database");

class RoleService {
  async create(name, intro, menuList) {
    // 1.创建角色信息
    const sql = `INSERT INTO role (name, intro) VALUES (?, ?);`;
    const [result] = await connection.execute(sql, [name, intro]);

    // 2.获取新创建角色的ID
    const roleId = result.insertId;

    // 2. 创建角色权限关联
    for (const menu_id of menuList) {
      const sqlCreateRoleMenu = `INSERT INTO role_menu (role_id, menu_id) VALUES (?, ?)`;
      await connection.execute(sqlCreateRoleMenu, [roleId, menu_id]);
    }
  }

  async getRoleMenu(roleId) {
    try {
      // 1.构建菜单权限树型结构函数
      async function buildMenuTree(permissions, parentId = null) {
        let menu = [];
        for (const childPermission of permissions.filter(
          (permission) => permission.parentId === parentId
        )) {
          let subMenu = {
            id: childPermission.menuId,
            name: childPermission.name,
            type: childPermission.type,
            url: childPermission.url,
            icon: childPermission.icon,
            sort: childPermission.sort,
          };

          // 检查是否存在权限字段，如果存在则添加到菜单项中
          if (childPermission.permission) {
            subMenu.permission = childPermission.permission;
          }

          let children = await buildMenuTree(
            permissions,
            childPermission.menuId
          );
          if (children.length > 0) {
            subMenu.children = children;
          }
          menu.push(subMenu);
        }
        return menu;
      }

      // 2.根据角色id查询出对应的菜单权限
      const sql = `
     SELECT 
     m.*
     FROM menu m 
     JOIN role_menu rm ON m.menuId = rm.menu_id
     JOIN role r ON rm.role_id = r.roleId
     WHERE r.roleId = ?;`;
      const [result] = await connection.execute(sql, [roleId]);

      // 3.将数据库查询结果转换为数组对象
      const permissions = result.map((row) => ({
        menuId: row.menuId,
        name: row.name,
        type: row.type,
        icon: row.icon,
        sort: row.sort,
        parentId: row.parentId,
        url: row.url,
        permission: row.permission,
      }));

      // 构建菜单树形结构
      const menuTree = buildMenuTree(permissions);
      return menuTree;
    } catch (error) {
      console.error("角色菜单获取失败:", error);
    }
  }
  //查询角色列表
  async getRoleMenuList_1(offset, size) {
    // 查询角色
    let result;
    if (!offset && !size) {
      const [res] = await connection.execute("SELECT * FROM role;");
      result = res;
    } else {
      const [res] = await connection.execute("SELECT * FROM role LIMIT ?, ?", [
        offset.toString(),
        size.toString(),
      ]);
      result = res;
    }

    // 循环遍历角色
    for (const role of result) {
      // 查询该角色拥有的菜单权限
      const [roleMenus] = await connection.execute(
        "SELECT * FROM menu JOIN role_menu ON menu.menuId = role_menu.menu_id WHERE role_menu.role_id = ?",
        [role.roleId]
      );

      // 构建权限树的递归函数
      function buildPermissionTree(parentId) {
        const children = [];
        for (const menu of roleMenus) {
          if (menu.parentId === parentId) {
            const menuItem = {
              id: menu.menuId,
              name: menu.name,
              parentId: menu.parentId,
              sort: menu.sort || null,
              url: menu.url || null,
              type: menu.type || null,
              icon: menu.icon || null,
              permission: menu.permission || null,
              // 递归构建子权限
              children: buildPermissionTree(menu.menuId),
            };

            // 移除值为 null 或 undefined 的属性
            Object.keys(menuItem).forEach(
              (key) => menuItem[key] == null && delete menuItem[key]
            );

            children.push(menuItem);
          }
        }
        return children;
      }

      // 构建权限树的根节点（parentId 为 null 的菜单项）
      const permissionTree = buildPermissionTree(null);

      // 将权限树赋给该角色的 menuList 属性
      role.menuList = permissionTree;
    }

    // 返回包含角色和权限树的数据结构
    const [listLength] = await connection.execute(`SELECT * FROM role;`);
    const res = {
      list: result,
      totalCount: listLength.length,
    };
    return res;
    // return result;
  }
  // 根据条件查询
  async getRoleMenuList_2(offset, size, name, intro) {
    let conditions = [];
    let params = [];

    if (name !== undefined && name !== "") {
      conditions.push("r.name LIKE ?");
      params.push(`%${name}%`);
    }

    if (intro !== undefined && intro !== "") {
      conditions.push("r.intro LIKE ?");
      params.push(`%${intro}%`);
    }

    let whereClause = "";
    if (conditions.length > 0) {
      whereClause = "WHERE " + conditions.join(" AND ");
    }

    const sql = `
      SELECT *
      FROM Role r
      ${whereClause}
      LIMIT ? OFFSET ?;
    `;

    params.push(size.toString(), offset.toString());

    const [result] = await connection.execute(sql, params);

    // 循环遍历角色
    for (const role of result) {
      // 查询该角色拥有的菜单权限
      const [roleMenus] = await connection.execute(
        "SELECT * FROM menu JOIN role_menu ON menu.menuId = role_menu.menu_id WHERE role_menu.role_id = ?",
        [role.roleId]
      );

      // 构建权限树的递归函数
      function buildPermissionTree(parentId) {
        const children = [];
        for (const menu of roleMenus) {
          if (menu.parentId === parentId) {
            const menuItem = {
              id: menu.menuId,
              name: menu.name,
              parentId: menu.parentId,
              sort: menu.sort || null,
              url: menu.url || null,
              type: menu.type || null,
              icon: menu.icon || null,
              permission: menu.permission || null,
              // 递归构建子权限
              children: buildPermissionTree(menu.menuId),
            };

            // 移除值为 null 或 undefined 的属性
            Object.keys(menuItem).forEach(
              (key) => menuItem[key] == null && delete menuItem[key]
            );

            children.push(menuItem);
          }
        }
        return children;
      }

      // 构建权限树的根节点（parentId 为 null 的菜单项）
      const permissionTree = buildPermissionTree(null);

      // 将权限树赋给该角色的 menuList 属性
      role.menuList = permissionTree;
    }

    // 返回包含角色和权限树的数据结构
    const res = {
      list: result,
      totalCount: result.length,
    };
    return res;
  }

  async getRoleId(roleId) {
    const [result] = await connection.execute(
      `SELECT * FROM role WHERE roleId = ?;`,
      [roleId]
    );
    return result;
  }

  async remove(roleId) {
    const sql = `DELETE FROM role WHERE roleId = ?;`;
    const [result] = await connection.execute(sql, [roleId]);
    return result;
  }

  async update(roleId, name, intro, menuList) {
    // 1.更新角色信息
    const sql = `UPDATE role SET name = ?,intro = ? WHERE roleId = ?;`;
    const [result] = await connection.execute(sql, [name, intro, roleId]);

    // 2.删除原来菜单权限
    const sql2 = `DELETE FROM role_menu WHERE role_id = ?;`;
    const [result2] = await connection.execute(sql2, [roleId]);

    // 3.将新的菜单权限关联到role_menu上
    for (const menu_id of menuList) {
      const sql3 = `INSERT INTO role_menu (role_id, menu_id) VALUES (?, ?)`;
      const [result2] = await connection.execute(sql3, [roleId, menu_id]);
    }
  }
}

module.exports = new RoleService();
