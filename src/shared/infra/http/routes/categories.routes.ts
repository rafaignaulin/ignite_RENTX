import CreateCategoryController from "@modules/cars/useCase/createCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCase/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCase/listCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post(
  "/create",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
