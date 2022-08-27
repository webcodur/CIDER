import { EducationModel } from "../schemas/education";

const Education = {
  create: async ({ newEducation }) => {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  },

  findAllByUserId: async ({ userId }) => {
    const educationList = await EducationModel.find({ user_id: userId });
    return educationList;
  },

  findOneById: async ({ userId, educationId }) => {
    const education = await EducationModel.findOne({
      user_id: userId,
      id: educationId,
    });
    return education;
  },

  update: async ({ userId, educationId, update }) => {
    const filter = {
      user_id: userId,
      id: educationId,
    };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  },

  delete: async ({ userId, educationId }) => {
    const deletedCount = await EducationModel.deleteOne({
      user_id: userId,
      id: educationId,
    });
    return deletedCount;
  },
};

export { Education };
