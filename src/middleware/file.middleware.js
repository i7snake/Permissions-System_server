const fs = require("fs");
const multer = require("@koa/multer");
const { UPLOAD_PATH } = require("../config/filePath");
const { showAvatar, create, updateAvatar } = require("../service/file.service");

// 1.解析文件上传
const uploadFile = multer({
  dest: UPLOAD_PATH,
});

const handleFile = uploadFile.single("avatar");

// 2.删除旧头像文件 和 avatar表旧头像 只保留最新头像
const deleteOldAvatar = async (ctx, next) => {
  const { filename, mimetype, size } = ctx.request.file;
  const { id } = ctx.user;

  // 查询该用户是否已有头像信息
  const existingAvatar = await showAvatar(id);
  if (existingAvatar) {
    // 如果已有头像信息，则获取旧头像的文件名
    const oldFilename = existingAvatar.filename;

    // 删除服务器上的旧头像文件
    if (oldFilename) {
      const oldFilePath = `${UPLOAD_PATH}/${oldFilename}`;
      fs.unlinkSync(oldFilePath);
    }

    // 更新现有记录
    const result = await updateAvatar(filename, mimetype, size, id);
  } else {
    // 如果没有头像信息，则插入新记录
    const result = await create(filename, mimetype, size, id);
  }

  await next();
};
module.exports = { handleFile, deleteOldAvatar };
