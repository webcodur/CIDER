import { Router } from "express";
import { projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
import { validationMiddleware } from "../middlewares/validationMiddleware";

const projectRouter = Router();

// project 생성 라우터
projectRouter.post(
  "/project",
  login_required,
  validationMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { title, content, startDay, endDay } = req.body;

      const createdNewProject = await projectService.addProject({
        userId,
        title,
        content,
        startDay,
        endDay,
      });

      res.status(201).json(createdNewProject);
    } catch (error) {
      next(error);
    }
  }
);

// project 조회 라우터
projectRouter.get(
  "/projects/:userId",
  login_required,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const projects = await projectService.getProjects({ userId });

      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
);

// project 업데이트 라우터
projectRouter.patch(
  "/project/:projectId",
  login_required,
  validationMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { projectId } = req.params;
      const toUpdate = req.body;

      const updatedProject = await projectService.updateProject({
        userId,
        projectId,
        toUpdate,
      });

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

// project 삭제 라우터
projectRouter.delete(
  "/project/:projectId",
  login_required,
  async (req, res, next) => {
    try {
      const userId = req.currentUserId;
      const { projectId } = req.params;

      const deletedCount = await projectService.deleteProject({
        userId,
        projectId,
      });

      res.status(200).json(deletedCount);
    } catch (error) {
      next(error);
    }
  }
);

export { projectRouter };
