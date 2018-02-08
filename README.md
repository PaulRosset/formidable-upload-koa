# formidable-upload-koa

[![Travis](https://img.shields.io/travis/PaulRosset/formidable-upload-koa.svg)]()
[![Codecov](https://img.shields.io/codecov/c/github/PaulRosset/formidable-upload-koa.svg)]()

Koa middleware based on formidable uploader.

[Formidable](https://github.com/felixge/node-formidable)

## Install

```
yarn add formidable-upload-koa
```

## Usage

```
const koa = require("koa");
const Router = require("koa-router");
const koaForm = require("formidable-upload-koa");

const app = new koa();
const router = new Router();

const options = {
  uploadDir: `${__dirname}/`,
  keepExtensions: true
};

router.post("/uploader", koaForm(options), ctx => {
  // Access to
  // ctx.req.files
  // ctx.req.fields
  // The file has been uploaded in the folder choosen above.
});

app.use(router.routes());
app.listen(8080);
```

## Test

```
yarn test
```

## License

MIT
