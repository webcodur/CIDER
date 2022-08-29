const multer = require("multer");

// 프로필 사진 업로드 미들웨어
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../images/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, req.currentUserId);
  },
});

const profileUpload = multer({
  storage: storage,
});

export { profileUpload };
