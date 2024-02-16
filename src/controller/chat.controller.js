const {
  create,
  isNull,
  queryId,
  remove,
  update,
  getList,
} = require("../service/chat.service");

class ChatController {
  async create(ctx, next) {
    try {
      // 1.发布内容
      const { content } = ctx.request.body;

      // 2.登录用户
      const { id } = ctx.user;

      const result = await create(content, id);

      ctx.body = {
        code: 0,
        message: "发布成功！",
      };
    } catch (error) {
      ctx.body = {
        err: "未知错误" + error,
      };
    }
  }

  async list(ctx, next) {
    const result = await getList();

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async detail(ctx, next) {
    const { chatId } = ctx.params;

    const isChatId = await isNull(chatId);
    if (!isChatId) {
      return ctx.app.emit("error", "is_null_chatId", ctx);
    }

    const result = await queryId(chatId);

    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async remove(ctx, next) {
    const { chatId } = ctx.params;
    const result = await remove(chatId);
    ctx.body = {
      code: 0,
      message: "删除成功!",
    };
  }

  async update(ctx, next) {
    const { chatId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await update(content, chatId);

    ctx.body = {
      code: 0,
      message: "修改成功!",
    };
  }
}

module.exports = new ChatController();
