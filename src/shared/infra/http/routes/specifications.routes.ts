import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/createSpecificationController";
import ListSpecificationsController from "@modules/cars/useCases/listSpecifications/ListCategoriesController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listSpecificationsController.handle
);
