import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

//학력 추가
educationRouter.post(
  "/education/create",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const user_id = req.currentUserId;
      const { school, major, position } = req.body;

      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

// 나의 학력 조회
educationRouter.get(
  "/educationList/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const educationList = await educationService.getMyEducationList({
        user_id,
      });
      res.status(200).json(educationList);
    } catch (error) {
      next(error);
    }
  }
);

//개별 education 조회
educationRouter.get(
  "/educations/:id",
  login_required,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const education = await educationService.getMyEducation({
        id,
      });
      res.status(200).json(education);
    } catch (error) {
      next(error);
    }
  }
);

// 나의 학력 편집, 업데이트
educationRouter.put(
  "educations/:educaitonId",
  login_required,
  async (req, res, next) => {
    try {
      const { educaitonId } = req.params;

      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };
      const updatedEducation = await educationService.updateEducation({
        educaitonId,
        toUpdate,
      });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }
      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
