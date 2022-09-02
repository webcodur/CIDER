import is from "@sindresorhus/is";
import { Award } from "../db/models/Award";
import { User } from "../db/models/User";
import { v4 as uuidv4 } from "uuid";
import { ERRORS } from "../constants/constants";

const awardService = {
  addAward: async ({ userId, title, description }) => {
    const id = uuidv4();
    const newAward = { user_id: userId, id, title, description };
    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  },

  getAwards: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      throw new Error(ERRORS.USER_ID_ERROR.errorCode);
    }

    const awards = await Award.findAllByUserId({ userId });
    return awards;
  },

  updateAward: async ({ userId, awardId, toUpdate }) => {
    let award = await Award.findOneById({ userId, awardId });

    if (!award) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }

    const updatedAward = await Award.update({
      userId,
      awardId,
      update: toUpdate,
    });

    return updatedAward;
  },

  deleteAward: async ({ userId, awardId }) => {
    const award = await Award.findOneById({
      userId,
      awardId,
    });
    if (!award) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }
    const deletedCount = await Award.delete({ userId, awardId });
    return deletedCount;
  },
};

export { awardService };
