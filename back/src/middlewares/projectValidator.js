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

exports.projectPostValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 20 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode),
    body("content")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 200 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode),
    body("startDay")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isISO8601("yyyy-mm-dd")
      .withMessage(ERRORS.DATE_FORMAT_ERROR.errorCode),
    body("endDay")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isISO8601("yyyy-mm-dd")
      .withMessage(ERRORS.DATE_FORMAT_ERROR.errorCode)
      .custom((value, { req }) => {
        let endDay = new Date(value);
        let startDay = new Date(req.body.startDay); // <-- startDay
        if (endDay < startDay) {
          throw new Error(ERRORS.DATE_TERM_ERROR.errorCode);
        }
        return true;
      }),
    validate,
  ];
};

exports.projectPatchValidator = () => {
  return [
    body().custom((value, { req }) => {
      const update = {};
      const toUpdate = req.body;
      const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
      if (toUpdate.title) {
        if (toUpdate.title.length > 20) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        update.title = toUpdate.title;
      }
      if (toUpdate.content) {
        if (toUpdate.content.length > 200) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        update.content = toUpdate.content;
      }
      if (toUpdate.startDay) {
        if (!regex.test(toUpdate.startDay)) {
          throw new Error(ERRORS.DATE_FORMAT_ERROR.errorCode);
        }
        update.startDay = toUpdate.startDay;
      }
      if (toUpdate.endDay) {
        if (!regex.test(toUpdate.startDay)) {
          throw new Error(ERRORS.DATE_FORMAT_ERROR.errorCode);
        }
        update.endDay = toUpdate.endDay;
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
