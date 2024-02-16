const connection = require("../app/database");

class PermissionService {
  async checkResouce(resourceName, resourceId, userId) {
    const sql = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(sql, [resourceId, userId]);
    return !!result.length;
  }
}

module.exports = new PermissionService();
