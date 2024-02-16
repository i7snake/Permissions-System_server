const connection = require("../app/database");

class CategoryService {
  async list_1(offset, size) {
    const sql = `
    SELECT c.*,
    JSON_OBJECT("userId",u.id, "name",u.name,"realname",u.realname,"cellphone",u.cellphone,"enable",u.cellphone,"departmentId",u.departmentId,"roleId",u.roleId) user
     FROM category c LEFT JOIN user u ON c.user_id = u.id
    `;
    let endResult;
    if (!offset && !size) {
      const [result] = await connection.execute(sql);
      endResult = result;
    } else {
      const paginatedSql = `${sql} LIMIT ? OFFSET ?;`;
      const [result] = await connection.execute(paginatedSql, [
        size.toString(),
        offset.toString(),
      ]);
      endResult = result;
    }

    const [listLength] = await connection.execute(`SELECT * FROM category`); //获取总个数

    const res = {
      list: endResult,
      totalCount: listLength.length,
    };
    return res;
  }
  async list_2(offset, size, name, description) {
    let sql = `
        SELECT c.*,
        JSON_OBJECT("userId", u.id, "name", u.name, "realname", u.realname, "cellphone", u.cellphone, "enable", u.cellphone, "departmentId", u.departmentId, "roleId", u.roleId) user
        FROM category c
        LEFT JOIN user u ON c.user_id = u.id
        WHERE 1=1`;

    const params = [];

    if (name) {
      sql += ` AND c.name LIKE ?`;
      params.push(`%${name}%`);
    }
    if (description) {
      sql += ` AND c.description LIKE ?`;
      params.push(`%${description}%`);
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(size.toString(), offset.toString());

    const [result] = await connection.execute(sql, params);

    const res = {
      list: result,
      totalCount: result.length,
    };

    return res;
  }

  async getCategory(categoryId) {
    const sql = `
    SELECT c.*,
    JSON_OBJECT("userId",u.id, "name",u.name,"realname",u.realname,"cellphone",u.cellphone,"enable",u.cellphone,"departmentId",u.departmentId,"roleId",u.roleId) user
    FROM category c LEFT JOIN user u ON c.user_id = u.id 
    WHERE c.id = ?;
    `;
    const [result] = await connection.execute(sql, [categoryId]);
    return result;
  }
  async create(name, description, userId) {
    const sql = `INSERT INTO category (name,description,user_id) VALUES (?,?,?);`;
    const [result] = await connection.execute(sql, [name, description, userId]);
    return result;
  }

  async update(name, description, userId, categoryId) {
    const sql = `UPDATE category SET name = ?, description = ?, user_id = ? WHERE id = ?;`;
    const [result] = await connection.execute(sql, [
      name,
      description,
      userId,
      categoryId,
    ]);
    return result;
  }

  async remove(categoryId) {
    const sql = `DELETE FROM category WHERE id = ?; `;
    const [result] = await connection.execute(sql, [categoryId]);
    return result;
  }
}

module.exports = new CategoryService();
