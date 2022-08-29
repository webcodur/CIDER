import { Certificate, User } from "../db";
import { v4 as uuidv4 } from "uuid";
import is from "@sindresorhus/is";
import { ERRORS } from "../constants/constants";

const certificateService = {
  // userId와 certificate 데이터를 받아서 certificate 생성
  addCertificate: async ({ userId, title, content, day }) => {
    if (!title || !content || !day) {
      throw new Error(ERRORS.BODY_DATA_ERROR.errorCode);
    }

    const id = uuidv4();
    const newCertificate = {
      user_id: userId,
      id,
      title,
      content,
      day: new Date(day),
    };

    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  },
  // userId로 모든 certificate 조회
  getCertificates: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      throw new Error(ERRORS.USER_ID_ERROR.errorCode);
    }

    const certificates = await Certificate.findAllByUserId({ userId });

    return certificates;
  },
  // userId, certificateId, 업데이트 할 데이터를 받아서 해당 certificate를 업데이트
  updateCertificate: async ({ userId, certificateId, toUpdate }) => {
    const certificate = await Certificate.findOneById({
      userId,
      certificateId,
    });
    if (!certificate) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }

    const update = {};
    if (toUpdate.title) {
      update.title = toUpdate.title;
    }
    if (toUpdate.content) {
      update.content = toUpdate.content;
    }
    if (toUpdate.day) {
      update.day = toUpdate.day;
    }

    if (is.emptyObject(update)) {
      throw new Error(ERRORS.UPDATE_DATA_ERROR.errorCode);
    }

    const updatedCertificate = await Certificate.update({
      userId,
      certificateId,
      update,
    });

    return updatedCertificate;
  },
  // userId와 certificateId를 받아서 해당 certificate 삭제
  deleteCertificate: async ({ userId, certificateId }) => {
    const certificate = await Certificate.findOneById({
      userId,
      certificateId,
    });
    if (!certificate) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }

    const deletedCount = await Certificate.delete({ userId, certificateId });

    return deletedCount;
  },
};

export { certificateService };
