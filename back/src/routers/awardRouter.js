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
    const user_id = req.currentUserId;
    const { title, description } = req.body;

    const newAward = await awardService.addAward({
      user_id,
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
awardRouter.get("/awards/:user_id", login_required, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const awards = await awardService.getMyAwards({
      user_id,
    });
    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

//개별 수상이력 조회
awardRouter.get("/award/:id", login_required, async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await awardService.getMyAward({
      id,
    });
    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

// 나의 수상이력 편집, 업데이트
awardRouter.put("/awards/:awardId", login_required, async (req, res, next) => {
  try {
    const awardId = req.params.awardId;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };
    const updatedAward = await awardService.updateAward({
      id: awardId,
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
  "/awards/:awardId",
  login_required,
  async (req, res, next) => {
    try {
      const awardId = req.params.awardId;

      const deletedAward = await awardService.deleteAward({
        id: awardId,
      });

      res.status(200).send("삭제되었습니다.");
    } catch (error) {
      next(error);
    }
  }
);

export { awardRouter };
