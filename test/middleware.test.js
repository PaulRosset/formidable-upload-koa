const request = require("supertest");
const { options, app } = require("./koa_server-testing");
const fs = require("fs");

let requestSchema;

describe("Testing Options Schema", () => {
  beforeAll(async done => {
    requestSchema = await request(app.callback())
      .post("/uploader")
      .field("pic", "test image")
      .attach("pic", `${__dirname}/test.jpg`);
    done();
  });

  test("Test Present Object", () => {
    expect(requestSchema.body).toBeTruthy();
    expect(requestSchema.body.pic).toBeTruthy();
  });

  test("Test Uploaded Image presence", done => {
    fs.access(requestSchema.body.pic.path, err => {
      if (err) throw err;
      expect(err).toBeFalsy();
      done();
    });
  });

  test("Test size matching and Time matching of the file", done => {
    const { path, size, mtime } = requestSchema.body.pic;
    fs.lstat(path, (err, stats) => {
      if (err) throw err;
      const ExpectedTime = stats.birthtime.toString().split(".")[0];
      const Time = new Date(mtime).toString();
      expect(err).toBeFalsy();
      expect(size).toEqual(stats.size);
      expect(Time).toEqual(ExpectedTime);
      done();
    });
  });

  test("Testing UploaDir option", () => {
    const dir = requestSchema.body.pic.path.split("/");
    const sliced = dir.slice(0, dir.length - 1).join("/") + "/";
    expect(sliced).toEqual(options.uploadDir);
  });

  test("Testing KeepExtension option", () => {
    const { path, name } = requestSchema.body.pic;
    const extensionExpected = name.split(".")[1];
    const extensionReal = path.split(".")[1];
    expect(options.keepExtensions).toBeTruthy();
    expect(extensionReal).toEqual(extensionExpected);
  });
});
