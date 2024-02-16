const connection = require("../app/database");

class CommentService {
  async create(content, chatId, id) {
    const sql = `INSERT INTO comment (content,chat_id,user_id) VALUES (?,?,?);`;
    const [result] = await connection.execute(sql, [content, chatId, id]);
    return result;
  }

  async reply(content, chatId, commentId, userId) {
    const sql = `INSERT INTO comment (content,chat_id,comment_id,user_id) VALUES (?,?,?,?);`;
    const [result] = await connection.execute(sql, [
      content,
      chatId,
      commentId,
      userId,
    ]);
    return result;
  }

  async remove(commentId) {
    const sql = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(sql, [commentId]);

    return result;
  }

  async getLatestReplies() {
    const [allComments] = await connection.execute(
      `
      SELECT c.*,
      JSON_OBJECT("id",u.id,"name",u.name, "realname",u.realname) user,
			JSON_OBJECT("id",ch.id,"content",ch.content) chat
      FROM comment c LEFT JOIN user u ON c.user_id = u.id 
			LEFT JOIN chat ch ON c.chat_id = ch.id
      ORDER BY c.createAt DESC;
      `
    );

    let reply;
    if (allComments[0].comment_id) {
      [reply] = await connection.execute(
        `SELECT c.*,
        JSON_OBJECT("id",u.id,"name",u.name, "realname",u.realname) user
        FROM comment c
        LEFT JOIN user u ON c.user_id = u.id
        WHERE c.id = ${allComments[0].comment_id};`
      );
    } else {
      reply = [{ comment_id: null }];
    }
    return {
      comments: allComments[0],
      reply: reply[0],
    };
  }
}

module.exports = new CommentService();
