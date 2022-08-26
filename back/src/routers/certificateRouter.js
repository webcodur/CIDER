import { Router } from "express";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();

// certificate 생성 라우터
certificateRouter.post(
  "/certificates",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("자격증 데이터를 포함하여 요청해주세요.");
      }

      const userId = req.currentUserId;
      const { title, content, day } = req.body;

      const createdNewCertificate = await certificateService.addCertificate({
        userId,
        title,
        content,
        day,
      });

      if (createdNewCertificate.errorMessage) {
        throw new Error(createdNewCertificate.errorMessage);
      }

      res.status(201).json(createdNewCertificate);
    } catch (error) {
      next(error);
    }
  }
);

// certificate 조회 라우터
certificateRouter.get(
  "/certificates/:userId",
  login_required,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const certificateList = await certificateService.getCertificateList({
        userId,
      });

      if (certificateList.errorMessage) {
        throw new Error(certificateList.errorMessage);
      }

      res.status(200).json(certificateList);
    } catch (error) {
      next(error);
    }
  }
);

// certificate 업데이트 라우터
certificateRouter.patch(
  "/certificates/:certificateId",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("업데이트 할 자격증 데이터를 포함하여 요청해주세요.");
      }

      const userId = req.currentUserId;
      const { certificateId } = req.params;
      const toUpdate = req.body;

      const updatedCertificate = await certificateService.updateCertificate({
        userId,
        certificateId,
        toUpdate,
      });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

// certificate 삭제 라우터
certificateRouter.delete(
  "/certificates/:certificateId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { certificateId } = req.params;

      const deletedCount = await certificateService.deleteCertificate({
        userId,
        certificateId,
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
export { certificateRouter };
