import is from "@sindresorhus/is";
import { ERRORS } from "../constants/constants";
import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return next({ message: errors.errors[0].msg });
};

exports.awardPostValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 20 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode),
    body("description")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 200 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode),
    validate,
  ];
};

exports.awardPatchValidator = () => {
  return [
    body().custom((value, { req }) => {
      const update = {};
      const toUpdate = req.body;
      if (toUpdate.title) {
        if (toUpdate.title.length > 20) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        update.title = toUpdate.title;
      }
      if (toUpdate.description) {
        if (toUpdate.content.length > 200) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        update.content = toUpdate.content;
      }

      if (is.emptyObject(update)) {
        throw new Error(ERRORS.CONTENT_TYPE_ERROR.errorCode);
      }

      req.toUpdate = update;
      return true;
    }),

    validate,
  ];
};
