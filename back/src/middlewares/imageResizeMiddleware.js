const sharp = require("sharp");
const fs = require("fs");

function imageResizeMiddleware(req, res, next) {
  try {
    sharp(req.file.path)
      .resize({ width: 300, height: 300 })
      .withMetadata()
      .toBuffer((err, buffer) => {
        if (err) throw err;
        fs.writeFileSync(req.file.path, buffer, (err) => {
          if (err) throw err;
        });
      });
    next();
  } catch (error) {
    next(error);
  }
}

export { imageResizeMiddleware };
