import is from "@sindresorhus/is";
import { Education } from "../db/models/Education";
import { User } from "../db/models/User";
import { v4 as uuidv4 } from "uuid";
import { ERRORS } from "../constants/constants";

const educationService = {
  addEducation: async ({ userId, school, major, position }) => {
    const id = uuidv4();
    const newEducation = { user_id: userId, id, school, major, position };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  },

  getEducations: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      throw new Error(ERRORS.USER_ID_ERROR.errorCode);
    }

    const educations = await Education.findAllByUserId({ userId });
    return educations;
  },

  updateEducation: async ({ userId, educationId, toUpdate }) => {
    let education = await Education.findOneById({
      userId,
      educationId,
    });

    if (!education) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }

    const updatedEducation = await Education.update({
      userId,
      educationId,
      update: toUpdate,
    });

    return updatedEducation;
  },

  deleteEducation: async ({ userId, educationId }) => {
    const education = await Education.findOneById({
      userId,
      educationId,
    });
    if (!education) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }
    const deletedCount = await Education.delete({ userId, educationId });
    return deletedCount;
  },
};

export { educationService };
