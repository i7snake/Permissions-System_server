const connection = require("../app/database");
const userService = require("../service/user.service");
const md5Password = require("../utils/md5.password");

class UserController {
  async create(ctx, next) {
    // 1.获取用户传递过来的信息
    const { name, realname, password, cellphone, roleId, departmentId } =
      ctx.request.body;
    const result = await userService.create(
      name,
      realname,
      password,
      cellphone,
      roleId,
      departmentId
    );
    // 3. 查看存储结果，告知前端用户创建成功
    ctx.body = {
      message: "创建用户成功！",
      data: result,
    };
  }
  async remove(ctx, next) {
    // 获取params信息
    const { userId } = ctx.params;
    const result = await userService.remove(userId);
    ctx.body = {
      code: 0,
      message: "删除用户成功！",
    };
  }

  async change(ctx, next) {
    const { name, realname, cellphone, roleId, departmentId } =
      ctx.request.body;
    const { userId } = ctx.params;
    const result = await userService.change(
      name,
      realname,
      cellphone,
      roleId,
      departmentId,
      userId
    );

    ctx.body = {
      code: 0,
      message: "修改用户成功！",
    };
  }

  async getUserId(ctx, next) {
    const { userId } = ctx.params;

    const result = await userService.getUserId(userId);

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async getUserList(ctx, next) {
    const {
      offset = 0,
      size = 10,
      cellphone,
      name,
      realname,
      enable,
    } = ctx.request.body;

    let result;
    if (!cellphone && !name && !realname && !enable) {
      result = await userService.getUserList_1(offset, size);
    } else {
      result = await userService.getUserList_2(
        offset,
        size,
        cellphone,
        name,
        realname,
        enable
      );
    }

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async changePassword(ctx, next) {
    const { id, name } = ctx.user;
    const { oldPassword, newPassword, confirmPassword } = ctx.request.body;

    const isUser = await userService.findUserName(name);
    const user = isUser[0];
    if (!user) {
      return ctx.app.emit("error", "user_is_not_null", ctx); //判断用户是否存在
    }
    if (user.password !== md5Password(oldPassword)) {
      return ctx.app.emit("error", "password_is_error", ctx); //判断原密码是否一致
    }
    if (newPassword !== confirmPassword) {
      return ctx.app.emit("error", "newPassword_is_confirmPassword", ctx); //判断新和确认密码
    }

    const newPwd = md5Password(newPassword);

    const result = await userService.changePassword(id, newPwd);

    ctx.body = {
      code: 0,
      message: "密码修改成功！",
    };
  }
}

module.exports = new UserController();
