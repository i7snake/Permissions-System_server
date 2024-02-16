const {
  list_1,
  list_2,
  create,
  update,
  remove,
  getCategory,
} = require("../service/category.service");

class CategoryController {
  async list(ctx, next) {
    const { offset, size, name, description } = ctx.request.body;
    let result;
    if (!name && !description) {
      result = await list_1(offset, size);
    } else {
      result = await list_2(offset, size, name, description);
    }

    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async getCategory(ctx, next) {
    const { categoryId } = ctx.params;

    const result = await getCategory(categoryId);

    ctx.body = {
      code: 0,
      data: result[0],
    };
  }

  async create(ctx, next) {
    const { name, description, user_id } = ctx.request.body;

    const result = await create(name, description, user_id);

    ctx.body = {
      code: 0,
      message: "创建成功！",
    };
  }

  async update(ctx, next) {
    const { categoryId } = ctx.params;
    if (categoryId <= 17) return (ctx.body = "不能修改小于17的业务");

    const { name, description, user_id } = ctx.request.body;
    const result = await update(name, description, user_id, categoryId);

    ctx.body = {
      code: 0,
      message: "修改成功!",
    };
  }

  async remove(ctx, next) {
    const { categoryId } = ctx.params;

    if (categoryId <= 17) return (ctx.body = "不能删除小于17的业务");

    const result = await remove(categoryId);

    ctx.body = {
      code: 0,
      message: "删除成功！",
    };
  }
}

module.exports = new CategoryController();
