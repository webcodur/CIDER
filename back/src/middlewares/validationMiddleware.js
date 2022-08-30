import is from "@sindresorhus/is";
import { ERRORS } from "../constants/constants";

function validationMiddleware(req, res, next) {
  if (is.emptyObject(req.body)) {
    const error = new Error(ERRORS.CONTENT_TYPE_ERROR.errorCode);
    next(error);
    return;
  }
  next();
}

export { validationMiddleware };
