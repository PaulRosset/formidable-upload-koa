//

const formidable = require("formidable");


module.exports = function(
  options
) {
  let form = new formidable.IncomingForm();
  for (const opt in options) {
    form[opt] = options[opt];
  }
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      form.parse(
        (ctx.req),
        (err, fields, files) => {
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
