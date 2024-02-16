const connection = require("../app/database");

class MessagService {
  async list_1(offset, size) {
    const sql = `
    SELECT m.*,
    JSON_OBJECT('categoryId', c.id, 'categoryName', c.name, 'description', c.description) category
    FROM messages m
    LEFT JOIN category c ON m.category_id = c.id
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

    const [listLength] = await connection.execute(`SELECT * FROM messages`); //获取总个数

    const res = {
      list: endResult,
      totalCount: listLength.length,
    };
    return res;
  }
  async list_2(offset, size, name, message) {
    let sql = `
    SELECT m.*,
    JSON_OBJECT('categoryId', c.id, 'categoryName', c.name, 'description', c.description) category
    FROM messages m
    LEFT JOIN category c ON m.category_id = c.id
    WHERE 1=1`;

    const params = [];

    if (name) {
      sql += ` AND m.name LIKE ?`;
      params.push(`%${name}%`);
    }
    if (message) {
      sql += ` AND m.message LIKE ?`;
      params.push(`%${message}%`);
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

  async getMessage(messageId) {
    const sql = `
    SELECT m.*,
    JSON_OBJECT('categoryId', c.id, 'categoryName', c.name, 'description', c.description) category
    FROM messages m
    LEFT JOIN category c ON m.category_id = c.id
    WHERE m.id = ?;
    `;
    const [result] = await connection.execute(sql, [messageId]);
    return result;
  }

  async create(name, message, categoryId) {
    const sql = `INSERT INTO messages (name,message,category_id) VALUES (?,?,?);`;
    const [result] = await connection.execute(sql, [name, message, categoryId]);
    return result;
  }

  async update(name, message, categoryId, messageId) {
    const sql = `UPDATE messages SET name = ?, message = ?, category_id = ? WHERE id = ?;`;
    const [result] = await connection.execute(sql, [
      name,
      message,
      categoryId,
      messageId,
    ]);
    return result;
  }

  async remove(messageId) {
    const sql = `DELETE FROM messages WHERE id = ?; `;
    const [result] = await connection.execute(sql, [messageId]);
    return result;
  }
}

module.exports = new MessagService();
