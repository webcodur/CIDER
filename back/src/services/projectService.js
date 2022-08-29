import { Project, User } from "../db";
import { v4 as uuidv4 } from "uuid";
import is from "@sindresorhus/is";
import { ERRORS } from "../constants/constants";

const projectService = {
  // userId와 project데이터를 받아서 project 생성
  addProject: async ({ userId, title, content, startDay, endDay }) => {
    if (!title || !content || !startDay || !endDay) {
      throw new Error(ERRORS.BODY_DATA_ERROR.errorCode);
    }

    const id = uuidv4();
    const newProject = {
      user_id: userId,
      id,
      title,
      content,
      startDay: new Date(startDay),
      endDay: new Date(endDay),
    };
    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  },
  // userId로 모든 프로젝트 조회
  getProjects: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      throw new Error(ERRORS.USER_ID_ERROR.errorCode);
    }

    const projects = await Project.findAllByUserId({ userId });

    return projects;
  },
  // userId, project id, 업데이트 할 데이터를 받아서 해당 project를 업데이트
  updateProject: async ({ userId, projectId, toUpdate }) => {
    const project = await Project.findOneById({ userId, projectId });
    if (!project) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }

    const update = {};
    if (toUpdate.title) {
      update.title = toUpdate.title;
    }
    if (toUpdate.content) {
      update.content = toUpdate.content;
    }
    if (toUpdate.startDay) {
      update.startDay = toUpdate.startDay;
    }
    if (toUpdate.endDay) {
      update.endDay = toUpdate.endDay;
    }

    if (is.emptyObject(update)) {
      throw new Error(ERRORS.UPDATE_DATA_ERROR.errorCode);
    }

    const updatedProject = await Project.update({ userId, projectId, update });

    return updatedProject;
  },
  // userId와 projectId를 받아서 해당 project 삭제
  deleteProject: async ({ userId, projectId }) => {
    const project = await Project.findOneById({ userId, projectId });
    if (!project) {
      throw new Error(ERRORS.ITEM_ID_ERROR.errorCode);
    }

    const deletedCount = await Project.delete({ userId, projectId });

    return deletedCount;
  },
};

export { projectService };
