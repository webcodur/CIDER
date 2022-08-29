import { projectModel } from "../schemas/project";

const Project = {
  // project 생성
  create: async ({ newProject }) => {
    const createdNewProject = await projectModel.create(newProject);

    return createdNewProject;
  },
  // userId로 모든 Projects 조회
  findAllByUserId: async ({ userId }) => {
    const projects = await projectModel.find({ user_id: userId });

    return projects;
  },
  // userId와 projectId로 project 조회 (해당 프로젝트가 존재 하는지 파악)
  findOneById: async ({ userId, projectId }) => {
    const project = await projectModel.findOne({
      user_id: userId,
      id: projectId,
    });

    return project;
  },
  // project 업데이트
  update: async ({ userId, projectId, update }) => {
    const filter = {
      user_id: userId,
      id: projectId,
    };
    const option = { returnOriginal: false };

    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedProject;
  },
  // 하나의 project 삭제
  delete: async ({ userId, projectId }) => {
    const deletedCount = await projectModel.deleteOne({
      user_id: userId,
      id: projectId,
    });

    return deletedCount;
  },
};

export { Project };
