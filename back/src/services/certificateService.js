import { Certificate, User } from "../db";
import { v4 as uuidv4 } from "uuid";
import is from "@sindresorhus/is";

const certificateService = {
  // userId와 certificate 데이터를 받아서 certificate 생성
  addCertificate: async ({ userId, title, content, day }) => {
    if (!title || !content || !day) {
      const errorMessage =
        "자격증을 만들기에 필요한 데이터가 포함되지 않았습니다.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newCertificate = {
      user_id: userId,
      id,
      title,
      content,
      day,
    };

    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  },
  // userId로 모든 certificate 조회
  getCertificateList: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      const errorMessage = "유효하지 않은 아이디입니다.";
      return { errorMessage };
    }

    const certificateList = await Certificate.findAllByUserId({ userId });

    return certificateList;
  },
  // userId, certificateId, 업데이트 할 데이터를 받아서 해당 certificate를 업데이트
  updateCertificate: async ({ userId, certificateId, toUpdate }) => {
    const certificate = await Certificate.findOneById({
      userId,
      certificateId,
    });
    if (!certificate) {
      const errorMessage = "유효하지 않은 certificateId입니다.";
      return { errorMessage };
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
      const errorMessage = "업데이트 할 데이터가 없습니다.";
      return { errorMessage };
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
      const errorMessage = "유효하지 않은 certificateId입니다.";
      return { errorMessage };
    }

    const deletedCount = await Certificate.delete({ userId, certificateId });

    return deletedCount;
  },
};

export { certificateService };
