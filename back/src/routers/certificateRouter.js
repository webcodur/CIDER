import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";
import {
  certificatePostValidator,
  certificatePatchValidator,
} from "../middlewares/certificateValidator";

const certificateRouter = Router();

// certificate 생성 라우터
certificateRouter.post(
  "/certificate",
  login_required,
  certificatePostValidator(),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { title, content, day } = req.body;

      const createdNewCertificate = await certificateService.addCertificate({
        userId,
        title,
        content,
        day,
      });

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
      const certificates = await certificateService.getCertificates({
        userId,
      });

      res.status(200).json(certificates);
    } catch (error) {
      next(error);
    }
  }
);

// certificate 업데이트 라우터
certificateRouter.patch(
  "/certificate/:certificateId",
  login_required,
  certificatePatchValidator(),
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { certificateId } = req.params;
      const toUpdate = req.toUpdate;

      const updatedCertificate = await certificateService.updateCertificate({
        userId,
        certificateId,
        toUpdate,
      });

      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

// certificate 삭제 라우터
certificateRouter.delete(
  "/certificate/:certificateId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { certificateId } = req.params;

      const deletedCount = await certificateService.deleteCertificate({
        userId,
        certificateId,
      });

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }
  }
);
export { certificateRouter };
