const fs = require("fs");
const path = require("path");
const pathSep = path.sep;

function directoryCheckMiddleware(req, res, next) {
  const targetPath = path.join(
    __dirname,
    pathSep,
    "..",
    pathSep,
    "images",
    pathSep,
    "profiles"
  );
  // const path = __dirname + `/../images/profiles`;
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }

  next();
}

export { directoryCheckMiddleware };
