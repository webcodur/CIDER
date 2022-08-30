import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { searchService } from "../services/searchService";

const searchRouter = Router();

searchRouter.get("/search", login_required, async (req, res, next) => {
  try {
    const { option, contents } = req.query;

    const searches = await searchService.getSearches({
      option,
      contents,
    });

    res.status(200).json(searches);
  } catch (error) {
    next(error);
  }
});

export { searchRouter };
