import { EducationModel } from "../schemas/education";

const Education = {
  create: async function ({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  },

  findAll: async function () {
    const educationList = await EducationModel.find({});
    return educationList;
  },

  findByUserId: async function ({ user_id }) {
    const educationList = await EducationModel.find({ user_id });
    return educationList;
  },

  findById: async function ({ id: id }) {
    const education = await EducationModel.findOne({ id: id });
    return education;
  },

  update: async function ({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  },

  delete: async function ({ educationId }) {
    const education = await EducationModel.findOneAndDelete({
      id: educationId,
    });
    return education;
  },

  findBySchool: async function ({ school }) {
    const education = await EducationModel.findOne({ school });
    return education;
  },

  findByMajor: async function ({ major }) {
    const education = await EducationModel.findOne({ major });
    return education;
  },

  findByPosition: async function ({ position }) {
    const education = await EducationModel.findOne({ position });
    return education;
  },
};

export { Education };
