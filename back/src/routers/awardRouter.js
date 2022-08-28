import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

//수상이력 추가
awardRouter.post("/award", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.currentUserId;
    const { title, description } = req.body;

    const newAward = await awardService.addAward({
      userId,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

// 나의 수상이력 조회
awardRouter.get("/awards", login_required, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const awards = await awardService.getAwards({
      userId,
    });

    if (awards.errorMessage) {
      throw new Error(awards.errorMessage);
    }

    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

// 나의 수상이력 편집, 업데이트
awardRouter.patch("/award/:awardId", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("업데이트 할 수상이력 데이터를 포함하여 요청해주세요.");
    }

    const userId = req.currentUserId;
    const { awardId } = req.params;
    const toUpdate = req.body;

    const updatedAward = await awardService.updateAward({
      userId,
      awardId,
      toUpdate,
    });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }
    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

//개별 수상이력 삭제
awardRouter.delete(
  "/award/:awardId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { awardId } = req.params;

      const deletedCount = await awardService.deleteAward({
        userId,
        awardId,
      });

      if (deletedCount.errorMessage) {
        throw new Error(deletedCount.errorMessage);
      }

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }
  }
);

export { awardRouter };
