import { Award } from "../db/models/Award";
import { v4 as uuidv4 } from "uuid";

const awardService = {
  addAward: async function ({ user_id, title, description }) {
    const id = uuidv4();
    const newAward = { user_id, id, title, description };
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  },

  getAwards: async function () {
    const awards = await Award.findAll();
    return awards;
  },

  getMyAwards: async function ({ user_id }) {
    const awards = await Award.findByUserId({ user_id });
    return awards;
  },

  getMyAward: async function ({ id }) {
    const award = await Award.findById({ id: id });
    return award;
  },

  updateAward: async function ({ id: awardId, toUpdate }) {
    let award = await Award.findById({ id: awardId });

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({
        awardId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({
        awardId,
        fieldToUpdate,
        newValue,
      });
    }

    return award;
  },

  deleteAward: async function ({ id: awardId }) {
    const award = await Award.delete({ awardId });
    return award;
  },
};

export { awardService };
