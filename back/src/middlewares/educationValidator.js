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

exports.educationPostValidator = () => {
  return [
    body("school")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 20 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode),
    body("major")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 200 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode),
    body("position")
      .notEmpty()
      .withMessage(ERRORS.BODY_DATA_ERROR.errorCode)
      .bail()
      .isLength({ min: 1, max: 200 })
      .withMessage(ERRORS.CONTENT_LENGTH_ERROR.errorCode)
      .custom((value) => {
        if (!["재학중", "학사졸업", "석사졸업", "박사졸업"].includes(value)) {
          console.log(value);
          throw new Error(ERRORS.EDUCATION_DATA_ERROR.errorCode);
        }
        return true;
      }),
    validate,
  ];
};

exports.educationPatchValidator = () => {
  return [
    body().custom((value, { req }) => {
      const update = {};
      const toUpdate = req.body;
      if (toUpdate.school) {
        if (toUpdate.school.length > 20) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        update.school = toUpdate.school;
      }
      if (toUpdate.major) {
        if (toUpdate.major.length > 20) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        update.major = toUpdate.major;
      }
      if (toUpdate.position) {
        if (toUpdate.position.length > 20) {
          throw new Error(ERRORS.CONTENT_LENGTH_ERROR.errorCode);
        }
        if (
          !["재학중", "박사졸업", "학사졸업", "석사졸업"].includes(
            toUpdate.position
          )
        ) {
          throw new Error(ERRORS.EDUCATION_DATA_ERROR.errorCode);
        }
        update.position = toUpdate.position;
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
