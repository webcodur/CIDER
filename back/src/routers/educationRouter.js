import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { validationMiddleware } from "../middlewares/validationMiddleware";

const educationRouter = Router();

//학력 추가
educationRouter.post(
  "/education",
  login_required,
  validationMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { school, major, position } = req.body;

      const newEducation = await educationService.addEducation({
        userId,
        school,
        major,
        position,
      });

      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

// 나의 학력 조회
educationRouter.get(
  "/educations/:userId",
  login_required,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const educations = await educationService.getEducations({
        userId,
      });

      res.status(200).json(educations);
    } catch (error) {
      next(error);
    }
  }
);

// 나의 학력 편집, 업데이트
educationRouter.patch(
  "/education/:educationId",
  login_required,
  validationMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { educationId } = req.params;
      const toUpdate = req.body;

      const updatedEducation = await educationService.updateEducation({
        userId,
        educationId,
        toUpdate,
      });

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

// 개별 education 삭제
educationRouter.delete(
  "/education/:educationId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { educationId } = req.params;

      const deletedCount = await educationService.deleteEducation({
        userId,
        educationId,
      });

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
