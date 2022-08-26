import is from "@sindresorhus/is";
import { Education } from "../db/models/Education";
import { User } from "../db/models/User";
import { v4 as uuidv4 } from "uuid";

const educationService = {
  addEducation: async function ({ userId, school, major, position }) {
    if (!school || !major || !position) {
      const errorMessage =
        "학력을 만들기에 필요한 데이터가 포함되지 않았습니다.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newEducation = { user_id: userId, id, school, major, position };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  },

  getEducationList: async function ({ userId }) {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      const errorMessage = "유효하지 않은 사용자입니다.";
      return { errorMessage };
    }

    const educationList = await Education.findAllByUserId({ userId });
    return educationList;
  },

  updateEducation: async function ({ userId, educationId, toUpdate }) {
    let education = await Education.findOneById({
      userId,
      educationId,
    });

    if (!education) {
      const errorMessage = "유효하지 않은 educationId입니다.";
      return { errorMessage };
    }

    const update = {};
    if (toUpdate.school) {
      update.school = toUpdate.school;
    }
    if (toUpdate.major) {
      update.major = toUpdate.major;
    }
    if (toUpdate.position) {
      update.position = toUpdate.position;
    }

    if (is.emptyObject(update)) {
      const errorMessage = "업데이트 할 데이터가 없습니다.";
      return { errorMessage };
    }

    const updatedEducation = await Education.update({
      userId,
      educationId,
      update,
    });

    return updatedEducation;
  },

  deleteEducation: async function ({ userId, educationId }) {
    const education = await Education.findOneById({
      userId,
      educationId,
    });
    if (!education) {
      const errorMessage = "유효하지 않은 educationId입니다.";
      return { errorMessage };
    }
    const deletedCount = await Education.delete({ userId, educationId });
    return deletedCount;
  },
};

export { educationService };
