const koa = require("koa");
const Router = require("koa-router");
const koaForm = require("./../lib/index");

const app = new koa();
const router = new Router();

const options = {
  uploadDir: `${__dirname}/`,
  keepExtensions: true
};

router.post("/uploader", koaForm(options), ctx => {
  ctx.body = { ...ctx.req.fields, ...ctx.req.files };
});

app.use(router.routes());

module.exports.options = options;
module.exports.app = app;
