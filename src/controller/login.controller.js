// 用户验证成功 颁发token(非对称密钥)
const JWT = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screctKey");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;
    //颁发令牌，传入token
    const token = JWT.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    // 返回用户信息
    ctx.body = {
      code: 0,
      data: { token, id, name },
    };
  }
  test(ctx, next) {
    ctx.body = "验证通过！！";
  }
}

module.exports = new LoginController();
