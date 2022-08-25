import { Education } from "../db/models/Education";
import { v4 as uuidv4 } from "uuid";

const educationService = {
  addEducation: async function ({ user_id, school, major, position }) {
    const id = uuidv4();
    const newEducation = { user_id, id, school, major, position };
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  },

  getEducationList: async function () {
    const educations = await Education.findAll();
    return educations;
  },

  getMyEducationList: async function ({ user_id }) {
    const educationList = await Education.findByUserId({ user_id });
    return educationList;
  },

  getMyEducation: async function ({ id: id }) {
    const education = await Education.findById({ id: id });
    return education;
  },

  updateEducation: async function ({ id: educationId, toUpdate }) {
    const education = await Education.findById({ id: educationId });
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({
        id: educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({
        id: educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({
        id: educationId,
        fieldToUpdate,
        newValue,
      });
    }

    return education;
  },
};

export { educationService };
