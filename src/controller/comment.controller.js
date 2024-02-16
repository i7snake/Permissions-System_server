const {
  create,
  reply,
  remove,
  getLatestReplies,
} = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { content, chatId } = ctx.request.body;
    const { id } = ctx.user;

    const result = await create(content, chatId, id);

    ctx.body = {
      code: 0,
      message: "发表评论成功！",
    };
  }

  async reply(ctx, next) {
    const { content, chatId, commentId } = ctx.request.body;
    const { id } = ctx.user;

    const result = await reply(content, chatId, commentId, id);

    ctx.body = {
      code: 0,
      massage: "回复评论成功!",
    };
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;

    const result = await remove(commentId);

    ctx.body = {
      code: 0,
      message: "删除成功！",
    };
  }

  async getLatestReplies(ctx, next) {
    const res = await getLatestReplies();

    ctx.body = { code: 0, data: res };
  }
}

module.exports = new CommentController();
