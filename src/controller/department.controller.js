const {
  create,
  change,
  remove,
  getDepartmentId,
  getDepartmentList_1,
  getDepartmentList_2,
} = require("../service/department.service");

class DepartmentController {
  async create(ctx, next) {
    const { name, parentId, leader } = ctx.request.body;
    const result = await create(name, parentId, leader);
    ctx.body = {
      code: 0,
      message: "创建成功！",
    };
  }
  async change(ctx, next) {
    const { name, parentId, leader } = ctx.request.body;
    const { departmentId } = ctx.params;

    const result = await change(departmentId, name, parentId, leader);

    ctx.body = {
      code: 0,
      message: "修改成功！",
    };
  }
  async remove(ctx, next) {
    const { departmentId } = ctx.params;
    const result = await remove(departmentId);

    ctx.body = {
      code: 0,
      message: "删除成功！",
    };
  }
  async getDepartmentId(ctx, next) {
    const { departmentId } = ctx.params;
    const result = await getDepartmentId(departmentId);
    ctx.body = {
      code: 0,
      message: result,
    };
  }
  async getDepartmentList(ctx, next) {
    const { offset, size, name, leader } = ctx.request.body;
    let result;
    if (!leader && !name) {
      result = await getDepartmentList_1(offset, size);
    } else {
      result = await getDepartmentList_2(offset, size, name, leader);
    }

    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new DepartmentController();
