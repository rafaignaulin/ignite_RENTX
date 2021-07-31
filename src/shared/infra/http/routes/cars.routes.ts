import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableController = new ListAvailableCarsController();
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableController.handle);
