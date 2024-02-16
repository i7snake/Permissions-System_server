const connection = require("../app/database");
class UserService {
  async findUserName(name) {
    const sql = `SELECT * FROM user WHERE name = ?;`;
    const [result] = await connection.execute(sql, [name]);
    return result;
  }

  async create(name, realname, password, cellphone, roleId, departmentId) {
    const sql = `INSERT INTO user (name,realname,password,cellphone,roleId,departmentId) VALUES (?,?,?,?,?,?);`;
    const [result] = await connection.execute(sql, [
      name,
      realname,
      password,
      cellphone,
      roleId.toString(),
      departmentId.toString(),
    ]);
    return result;
  }

  async remove(userId) {
    const sql = `DELETE FROM user WHERE id = ?;`;
    const [result] = await connection.execute(sql, [userId]);
    return result;
  }

  async change(name, realname, cellphone, roleId, departmentId, userId) {
    const sql = `UPDATE user SET name = ?, realname = ?, cellphone = ?, roleId = ?, departmentId = ? WHERE id = ?;`;
    const [result] = await connection.execute(sql, [
      name,
      realname,
      cellphone,
      roleId,
      departmentId,
      userId,
    ]);
    return result;
  }

  async getUserId(userId) {
    // const sql = `SELECT * FROM user WHERE id = ?;`;
    const sql = `
        SELECT
        u.id id, u.name name, u.realname realname, u.cellphone cellphone, u.enable enable, u.avatar avatar, u.createAt createAt, u.updateAt updateAt,
        JSON_OBJECT("id",d.departmentId, "leader",d.leader, "name",d.name, "parentId",d.parentId, "createAt",d.createAt, "updateAt",d.updateAt) department,
        JSON_OBJECT("id",r.roleId, "name",r.name,"intro", r.intro, "createAt",r.createAt, "updateAt",r.updateAt) role
        FROM user u 
        LEFT JOIN department d ON u.departmentId = d.departmentId
        LEFT JOIN role r ON u.roleId = r.roleId
        WHERE u.id = ?;`;
    const [result] = await connection.execute(sql, [userId]);
    return result;
  }

  // 初始化用户列表查询
  async getUserList_1(offset, size) {
    const sql = `SELECT id,name,realname,cellphone,enable,departmentId,roleId,createAt,updateAt FROM user LIMIT ? OFFSET ?`;
    const [result] = await connection.execute(sql, [
      size.toString(), //转成字符串
      offset.toString(),
    ]);
    const sql2 = `SELECT id,name,realname,cellphone,enable,departmentId,roleId,createAt,updateAt FROM user`;
    const [result2] = await connection.execute(sql2);

    const res = {
      list: result,
      totalCount: result2.length,
    };
    return res;
  }
  // 根据条件进行用户列表精准查询
  async getUserList_2(offset, size, cellphone, name, realname, enable) {
    const conditions = [];
    const values = [];

    if (name !== "") {
      conditions.push("name LIKE ?");
      values.push(`%${name}%`);
    }

    if (realname !== "") {
      conditions.push("realname LIKE ?");
      values.push(`%${realname}%`);
    }

    if (cellphone !== "") {
      conditions.push("cellphone LIKE ?");
      values.push(`%${cellphone}%`);
    }

    if (enable !== "") {
      conditions.push("enable = ?");
      values.push(enable);
    }

    let whereClause = "";
    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(" OR ")}`;
    }

    const sql = `SELECT id,name,realname,cellphone,enable,departmentId,roleId,createAt,updateAt FROM user ${whereClause} LIMIT ? OFFSET ?;`;
    values.push(size.toString(), offset.toString());
    const [result] = await connection.execute(sql, values);

    const res = {
      list: result,
      totalCount: result.length,
    };

    return res;
  }

  async changePassword(userId, newPwd) {
    const sql = `UPDATE user SET password = ? WHERE id = ?;`;
    const [result] = await connection.execute(sql, [newPwd, userId]);
    return result;
  }
}

module.exports = new UserService();
