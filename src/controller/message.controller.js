const {
  list_1,
  list_2,
  create,
  update,
  remove,
  getMessage,
} = require("../service/message.service");

class MessagController {
  async list(ctx, next) {
    const { offset, size, name, message } = ctx.request.body;

    let result;
    if (!name && !message) {
      result = await list_1(offset, size);
    } else {
      result = await list_2(offset, size, name, message);
    }

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async getMessage(ctx, next) {
    const { messageId } = ctx.params;

    const result = await getMessage(messageId);

    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async create(ctx, next) {
    const { name, message, category_id } = ctx.request.body;

    const result = await create(name, message, category_id);

    ctx.body = {
      code: 0,
      message: "创建成功！",
    };
  }

  async update(ctx, next) {
    const { name, message, category_id } = ctx.request.body;
    const { messageId } = ctx.params;
    if (messageId <= 22) return (ctx.body = "不能修改小于22的业务信息");

    const result = await update(name, message, category_id, messageId);

    ctx.body = {
      code: 0,
      message: "修改成功！",
    };
  }

  async remove(ctx, next) {
    const { messageId } = ctx.params;
    if (messageId <= 22) return (ctx.body = "不能删除小于22的业务信息");

    const result = await remove(messageId);

    ctx.body = {
      code: 0,
      message: "删除成功！",
    };
  }
}

module.exports = new MessagController();
