const fs = require("fs");
const { uploadAvatarUser, showAvatar } = require("../service/file.service");
const { SERVER_PORT, SERVER_HOST } = require("../config/server");
const { UPLOAD_PATH } = require("../config/filePath");

class FileController {
  async create(ctx, next) {
    const { id } = ctx.user;

    const timestamp = Date.now();
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/file/users/avatar/${id}?timestamp=${timestamp}`;
    const res = await uploadAvatarUser(avatarUrl, id);

    ctx.body = {
      code: 0,
      message: "头像信息上传并保存！",
      data: avatarUrl,
    };
  }

  async showAvatar(ctx, next) {
    const { userId } = ctx.params;

    // 对应用户id的头像
    const avatarInfo = await showAvatar(userId);
    // 读取头像所在的文件
    const { filename, mimetype } = avatarInfo;

    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new FileController();
