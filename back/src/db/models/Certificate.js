import { certificateModel } from "../schemas/certificate";

const Certificate = {
  // certificate 생성
  create: async ({ newCertificate }) => {
    const createdNewCertificate = await certificateModel.create(newCertificate);

    return createdNewCertificate;
  },
  // user_id로 모든 certificate 조회
  findAllByUserId: async ({ userId }) => {
    const certificateList = await certificateModel.find({ user_id: userId });

    return certificateList;
  },
  // userId와 certificateId로 certificate 조회 (해당 자격증이 존재 하는지 파악)
  findOneById: async ({ userId, certificateId }) => {
    const certificate = await certificateModel.findOne({
      user_id: userId,
      id: certificateId,
    });

    return certificate;
  },
  // userId, certificateId, update할 데이터를 받아서 업데이트
  update: async ({ userId, certificateId, update }) => {
    const filter = {
      user_id: userId,
      id: certificateId,
    };
    const option = { returnOriginal: false };

    const updatedCertificate = await certificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedCertificate;
  },
  // certificate 삭제
  delete: async ({ userId, certificateId }) => {
    const deletedCount = await certificateModel.deleteOne({
      user_id: userId,
      id: certificateId,
    });

    return deletedCount;
  },
};

export { Certificate };
