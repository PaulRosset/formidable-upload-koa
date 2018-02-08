//@flow

const formidable: Object = require("formidable");

type Options = {
  encoding?: string,
  uploadDir?: string,
  keepExtensions?: boolean,
  maxFieldsSize?: number,
  maxFields?: number,
  hash?: boolean,
  multiples?: boolean
};

module.exports = function(
  options: Options
): (Object, () => Promise<Object>) => Promise<Object> {
  let form: Object = new formidable.IncomingForm();
  for (const opt: string in options) {
    form[opt] = options[opt];
  }
  return async (ctx: Object, next: () => Promise<Object>): Promise<any> => {
    await new Promise((resolve: () => void, reject: (err: Object) => void) => {
      form.parse(
        (ctx.req: Object),
        (err: Error, fields: Object, files: Object) => {
          if (err) return reject(err);
          ctx.req.fields = fields;
          ctx.req.files = files;
          resolve();
        }
      );
    });
    await next();
  };
};
