import is from "@sindresorhus/is";
import { Award } from "../db/models/Award";
import { User } from "../db/models/User";
import { v4 as uuidv4 } from "uuid";

const awardService = {
  addAward: async ({ userId, title, description }) => {
    if (!title || !description) {
      const errorMessage =
        "수상이력을 만들기에 필요한 데이터가 포함되지 않았습니다.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newAward = { user_id: userId, id, title, description };
    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  },

  getAwardList: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      const errorMessage = "유효하지 않은 사용자입니다.";
      return { errorMessage };
    }

    const awardList = await Award.findAllByUserId({ userId });
    return awardList;
  },

  updateAward: async ({ userId, awardId, toUpdate }) => {
    let award = await Award.findOneById({ userId, awardId });

    if (!award) {
      const errorMessage = "유효하지 않은 educationId입니다.";
      return { errorMessage };
    }

    const update = {};
    if (toUpdate.title) {
      update.title = toUpdate.title;
    }
    if (toUpdate.description) {
      update.description = toUpdate.description;
    }

    if (is.emptyObject(update)) {
      const errorMessage = "업데이트 할 데이터가 없습니다.";
      return { errorMessage };
    }

    const updatedAward = await Award.update({
      userId,
      awardId,
      update,
    });

    return updatedAward;
  },

  deleteAward: async ({ userId, awardId }) => {
    const award = await Award.findOneById({
      userId,
      awardId,
    });
    if (!award) {
      const errorMessage = "유효하지 않은 awardId입니다.";
      return { errorMessage };
    }
    const deletedCount = await Award.delete({ userId, awardId });
    return deletedCount;
  },
};

export { awardService };
