import { Router } from 'express';
import CreateSpecificationController from '@modules/cars/useCase/createSpecification/createSpecificationController';


export const specificationsRoutes = Router();


const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post("/", createSpecificationController.handle);
