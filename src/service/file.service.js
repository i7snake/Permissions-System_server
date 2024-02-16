const connection = require("../app/database");

class FileService {
  // 存储文件(头像)信息
  async create(filename, mimetype, size, userId) {
    const sql = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`;
    const [result] = await connection.execute(sql, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  // 修改头像信息
  async updateAvatar(filename, mimetype, size, userId) {
    const sql = ` UPDATE avatar SET filename = ?, mimetype = ?, size = ? WHERE user_id = ?;`;
    const [result] = await connection.execute(sql, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }

  //   将头像的地址信息，保存到user表中
  async uploadAvatarUser(avatarUrl, userId) {
    const sql = `UPDATE user SET avatar = ? WHERE id = ?;`;
    const [result] = await connection.execute(sql, [avatarUrl, userId]);
    return result;
  }

  // 查看头像
  async showAvatar(userId) {
    const sql = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(sql, [userId]);
    return result[0];
  }
}

module.exports = new FileService();
