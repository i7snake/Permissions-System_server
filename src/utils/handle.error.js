const app = require("../app");

app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";
  switch (error) {
    case "user_is_null":
      (code = -1001), (message = "用户或密码不能为空！");
      break;
    case "user_is_not_null":
      (code = -1002), (message = "用户不存在！");
      break;
    case "password_is_error":
      (code = -1000), (message = "密码错误，重新输入！");
      break;
    case "token_is_void":
      (code = -1003), (message = "token无效或过期！");
      break;
    case "user_is_complete":
      (code = -1004), (message = "请输入完整字段！");
      break;
    case "user_is_exist":
      (code = -1005), (message = "用户已存在,无法创建！");
      break;
    case "no_delete":
      (code = -1006), (message = "不能删除id小于10的用户！");
      break;
    case "no_update":
      (code = -1007), (message = "不能修改id小于10的用户！");
      break;
    case "no_delete_role":
      (code = -1006), (message = "不能删除id小于5的角色！");
      break;
    case "no_update_role":
      (code = -1007), (message = "不能修改id小于5的角色！");
      break;
    case "is_not_complete":
      (code = -1004), (message = "请输入完整字段，并授予权限！");
      break;
    case "is_null_chatId":
      (code = -1002), (message = "动态不存在");
      break;
    case "is_no_permission":
      (code = -1008), (message = "没有权限操作该资源！");
      break;
    case "newPassword_is_confirmPassword":
      (code = -1000), (message = "新密码和确认密码不一致");
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
