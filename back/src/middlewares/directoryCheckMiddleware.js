const fs = require("fs");

function directoryCheckMiddleware(req, res, next) {
  const path = __dirname + `/../images/profiles`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  next();
}

export { directoryCheckMiddleware };
