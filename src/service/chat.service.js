const connection = require("../app/database");

class ChatService {
  async create(content, userId) {
    const sql = "INSERT INTO chat (content,user_id) VALUES (?,?);";
    const [result] = await connection.execute(sql, [content, userId]);
    return result;
  }

  async isNull(chatId) {
    const sql = `SELECT * FROM chat WHERE id = ?`;
    const [result] = await connection.execute(sql, [chatId]);
    return !!result.length;
  }

  async getList() {
    // const sql = "SELECT * FROM chat;";
    // LIMIT 10 OFFSET 0;

    const sql = `
    SELECT 
    c.id id, c.content content, c.createAt createTime, c.updateAt updateTime,
    JSON_OBJECT("id",u.id, "realname",u.realname,"createTime",u.createAt, "updateTime",u.updateAt) user,
    (SELECT COUNT(*) FROM comment cm WHERE cm.chat_id = c.id) commentCount
    FROM chat c 
    LEFT JOIN user u ON c.user_id = u.id;
    `;

    const [result] = await connection.execute(sql);

    const res = {
      list: result,
      totalCount: result.length,
    };
    return res;
  }

  async queryId(chatId) {
    // const sql = `SELECT * FROM chat WHERE id = ?`;

    // 查询动态详情，同时展示评论详情和评论用户
    const sql = `
    SELECT 
    c.id id, c.content content, c.createAt createTime, c.updateAt updateTime,
    JSON_OBJECT("id",u.id, "realname",u.realname,"createTime",u.createAt, "updateTime",u.updateAt) user,
    (
		SELECT
		JSON_ARRAYAGG(JSON_OBJECT(
		"id",cm.id, "content",cm.content, "commentId",cm.comment_id,
		"user",JSON_OBJECT("id",cu.id,"realname",cu.realname)
		))
		FROM comment cm 
		LEFT JOIN user cu ON cm.user_id = cu.id
		WHERE cm.chat_id = c.id
		)comments
    FROM chat c 
    LEFT JOIN user u ON c.user_id = u.id 
		WHERE c.id = ? GROUP BY c.id;
    `;
    const [result] = await connection.execute(sql, [chatId]);
    return result;
  }

  async remove(chatId) {
    const sql = `DELETE FROM chat WHERE id = ?;`;
    const [result] = await connection.execute(sql, [chatId]);
    return result;
  }

  async update(content, chatId) {
    const sql = `UPDATE chat SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(sql, [content, chatId]);
    return result;
  }
}

module.exports = new ChatService();
