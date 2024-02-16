const {
  queryCount,
  pieCount,
  barCount,
  lineCount,
} = require("../service/chart.service");

class ChartController {
  async queryCount(ctx, next) {
    const result = await queryCount();
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async pieCount(ctx, next) {
    const result = await pieCount();
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async barCount(ctx, next) {
    const result = await barCount();
    ctx.body = {
      code: 0,
      data: result,
    };
  }

  async lineCount(ctx, next) {
    const result = await lineCount();
    ctx.body = {
      code: 0,
      data: result,
    };
  }
}

module.exports = new ChartController();
