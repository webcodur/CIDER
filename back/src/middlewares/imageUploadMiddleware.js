// 프로필 사진 업로드 미들웨어
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../images/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, req.currentUserId);
  },
});

const upload = multer({
  storage: storage,
});

export { upload };
