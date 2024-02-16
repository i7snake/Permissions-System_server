const connection = require("../app/database");

// 辅助函数
async function getCount(table, type, title, tips) {
  const [result] = await connection.execute(
    `SELECT COUNT(*) as count FROM ${table}`
  );
  return {
    type,
    title,
    tips,
    count: result[0].count,
  };
}
async function pie(table, name) {
  const [result] = await connection.execute(
    `SELECT COUNT(*) as count FROM ${table}`
  );
  return {
    name: name,
    value: result[0].count,
  };
}

class ChartService {
  async queryCount() {
    const tables = [
      { table: "user", type: "user", title: "用户总数", tips: "目前用户数" },
      {
        table: "department",
        type: "department",
        title: "部门总数",
        tips: "目前部门数",
      },
      { table: "role", type: "role", title: "角色总数", tips: "目前角色数" },
      {
        table: "category",
        type: "business",
        title: "业务总数",
        tips: "目前业务数",
      },
    ];

    const res = tables.map(({ table, type, title, tips }) =>
      getCount(table, type, title, tips)
    );

    const resultJsonCount = await Promise.all(res);

    return resultJsonCount;
  }

  async pieCount() {
    const tables = [
      { table: "user", name: "用户" },
      { table: "department", name: "部门" },
      { table: "role", name: "角色" },
      { table: "category", name: "业务" },
      { table: "chat", name: "动态" },
    ];

    const res = tables.map(({ table, name }) => {
      return pie(table, name);
    });

    const resultJsonCount = await Promise.all(res);

    return resultJsonCount;
  }

  async barCount() {
    const sql = `
    SELECT d.name, COUNT(u.id) as userCount
    FROM user u
    JOIN department d ON u.departmentId = d.departmentId
    GROUP BY d.name
    `;
    const [result] = await connection.execute(sql);
    return result;
  }

  async lineCount() {
    const sql = `
    SELECT u.id,u.realname, COUNT(*) as chatCount 
    FROM user u JOIN chat ON u.id = chat.user_id
    GROUP BY u.id, u.realname;
    `;

    const [result] = await connection.execute(sql);
    return result;
  }
}

module.exports = new ChartService();
