import { Router } from 'express';
import { specificationController } from '../modules/cars/useCase/createSpecification';

export const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return specificationController.handle(request, response);
})