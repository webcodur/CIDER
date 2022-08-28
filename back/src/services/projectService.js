import { Project, User } from "../db";
import { v4 as uuidv4 } from "uuid";
import is from "@sindresorhus/is";

const projectService = {
  // userId와 project데이터를 받아서 project 생성
  addProject: async ({ userId, title, content, startDay, endDay }) => {
    if (!title || !content || !startDay || !endDay) {
      const errorMessage =
        "프로젝트를 만들기에 필요한 데이터가 포함되지 않았습니다.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newProject = {
      user_id: userId,
      id,
      title,
      content,
      startDay,
      endDay,
    };
    const createdNewProject = await Project.create({ newProject });

    return createdNewProject;
  },
  // userId로 모든 프로젝트 조회
  getProjects: async ({ userId }) => {
    const user = await User.findById({ user_id: userId });

    if (!user) {
      const errorMessage = "유효하지 않은 아이디입니다.";
      return { errorMessage };
    }

    const projects = await Project.findAllByUserId({ userId });

    return projects;
  },
  // userId, project id, 업데이트 할 데이터를 받아서 해당 project를 업데이트
  updateProject: async ({ userId, projectId, toUpdate }) => {
    const project = await Project.findOneById({ userId, projectId });
    if (!project) {
      const errorMessage = "유효하지 않은 projectId입니다.";
      return { errorMessage };
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
      const errorMessage = "업데이트 할 데이터가 없습니다.";
      return { errorMessage };
    }

    const updatedProject = await Project.update({ userId, projectId, update });

    return updatedProject;
  },
  // userId와 projectId를 받아서 해당 project 삭제
  deleteProject: async ({ userId, projectId }) => {
    const project = await Project.findOneById({ userId, projectId });
    if (!project) {
      const errorMessage = "유효하지 않은 projectId입니다.";
      return { errorMessage };
    }

    const deletedCount = await Project.delete({ userId, projectId });

    return deletedCount;
  },
};

export { projectService };
