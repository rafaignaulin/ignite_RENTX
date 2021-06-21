import { Router } from 'express';
import multer from 'multer';

import  CreateCategoryController   from '../modules/cars/useCase/createCategory/CreateCategoryController';
import ImportCategoryController from '../modules/cars/useCase/importCategory/ImportCategoryController';

import  ListCategoriesController  from '../modules/cars/useCase/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
}); 


const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);


const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/",listCategoriesController.handle);


const importCategoryController = new ImportCategoryController();
categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);


export { categoriesRoutes };