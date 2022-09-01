import { ERRORS } from "../constants/constants";

function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);
  switch (error.message) {
    case ERRORS.CONTENT_TYPE_ERROR.errorCode:
      res.status(400).json(ERRORS.CONTENT_TYPE_ERROR);
      break;

    case ERRORS.BODY_DATA_ERROR.errorCode:
      res.status(400).json(ERRORS.BODY_DATA_ERROR);
      break;

    case ERRORS.USER_ID_ERROR.errorCode:
      res.status(400).json(ERRORS.USER_ID_ERROR);
      break;

    case ERRORS.ITEM_ID_ERROR.errorCode:
      res.status(400).json(ERRORS.ITEM_ID_ERROR);
      break;

    case ERRORS.UPDATE_DATA_ERROR.errorCode:
      res.status(400).json(ERRORS.UPDATE_DATA_ERROR);
      break;

    case ERRORS.IMAGE_TYPE_ERROR.errorCode:
      res.status(500).json(ERRORS.IMAGE_TYPE_ERROR);
      break;

    case ERRORS.DEFAULT_IMAGE_ERROR.errorCode:
      res.status(400).json(ERRORS.DEFAULT_IMAGE_ERROR);
      break;

    case ERRORS.CONTENT_LENGTH_ERROR.errorCode:
      res.status(400).json(ERRORS.CONTENT_LENGTH_ERROR);
      break;

    case ERRORS.DATE_FORMAT_ERROR.errorCode:
      res.status(400).json(ERRORS.DATE_FORMAT_ERROR);
      break;

    case ERRORS.DATE_TERM_ERROR.errorCode:
      res.status(400).json(ERRORS.DATE_TERM_ERROR);
      break;

    default:
      res.status(400).json(ERRORS.UNDEFINED_ERROR);
      break;
  }
}

export { errorMiddleware };
