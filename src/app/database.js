// 导入数据库驱动
const mysql = require("mysql2");

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "personnel_system",
  user: "root",
  password: "123456",
  connectionLimit: 5,
});

// 2.查看是否连接成功
connectionPool.getConnection((err, connection) => {
  // 判断是否有错误信息
  if (err) {
    console.log("获取连接失败", err);
    return;
  }
  // 获取connection 尝试和数据库建立连接
  connection.connect((err) => {
    if (err) {
      console.log("交互失败", err);
    } else {
      console.log("交互成功,操作数据库");
    }
  });
});

// 3.获取连接池连接对象
const connection = connectionPool.promise();

module.exports = connection;
