import { AwardModel } from "../schemas/award";

const Award = {
  create: async ({ newAward }) => {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  },

  findAllByUserId: async ({ userId }) => {
    const Awards = await AwardModel.find({ user_id: userId });
    return Awards;
  },

  findOneById: async ({ userId, awardId }) => {
    const award = await AwardModel.findOne({
      user_id: userId,
      id: awardId,
    });
    return award;
  },

  update: async ({ userId, awardId, update }) => {
    const filter = {
      user_id: userId,
      id: awardId,
    };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  },

  delete: async ({ userId, awardId }) => {
    const deletedCount = await AwardModel.deleteOne({
      used_id: userId,
      id: awardId,
    });
    return deletedCount;
  },
};

export { Award };
