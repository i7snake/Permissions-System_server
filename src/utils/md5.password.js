// 通过node内置加密模块crypto
const crypto = require("crypto");

function md5Password(password) {
  //创建加密方式
  const md5 = crypto.createHash("md5");

  // 进行加密并指定是十六进制
  const md5Pwd = md5.update(password).digest("hex");

  return md5Pwd;
}

module.exports = md5Password;
