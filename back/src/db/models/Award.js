import { AwardModel } from "../schemas/award";

const Award = {
  create: async function ({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  },

  findAll: async function () {
    const Awards = await AwardModel.find({});
    return Awards;
  },

  findByUserId: async function ({ user_id }) {
    const Awards = await AwardModel.find({ user_id });
    return Awards;
  },

  findById: async function ({ id }) {
    const award = await AwardModel.findOne({ id });
    return award;
  },

  update: async function ({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  },

  delete: async function ({ awardId }) {
    const award = await AwardModel.findOneAndDelete({
      id: awardId,
    });
    return award;
  },
};

export { Award };
