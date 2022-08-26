import { Router } from "express";
import { projectService } from "../services/projectService";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();

// project 생성 라우터
projectRouter.post("/projects", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("프로젝트 데이터를 포함하여 요청해주세요.");
    }

    const userId = req.currentUserId;
    const { title, content, startDay, endDay } = req.body;

    const createdNewProject = await projectService.addProject({
      userId,
      title,
      content,
      startDay,
      endDay,
    });

    if (createdNewProject.errorMessage) {
      throw new Error(createdNewProject.errorMessage);
    }

    res.status(201).json(createdNewProject);
  } catch (error) {
    next(error);
  }
});

// project 조회 라우터
projectRouter.get(
  "/projects/:userId",
  login_required,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const projectList = await projectService.getProjectList({ userId });

      if (projectList.errorMessage) {
        throw new Error(projectList.errorMessage);
      }

      res.status(200).json(projectList);
    } catch (error) {
      next(error);
    }
  }
);

// project 업데이트 라우터
projectRouter.patch(
  "/projects/:projectId",
  login_required,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("업데이트 할 프로젝트 데이터를 포함하여 요청해주세요.");
      }

      const userId = req.currentUserId;
      const { projectId } = req.params;
      const toUpdate = req.body;

      const updatedProject = await projectService.updateProject({
        userId,
        projectId,
        toUpdate,
      });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// project 삭제 라우터
projectRouter.delete(
  "/projects/:projectId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { projectId } = req.params;

      const deletedCount = await projectService.deleteProject({
        userId,
        projectId,
      });

      if (deletedCount.errorMessage) {
        throw new Error(deletedCount.errorMessage);
      }

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
