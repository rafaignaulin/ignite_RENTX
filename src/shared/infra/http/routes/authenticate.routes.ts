
import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUseController';
import { Router } from 'express';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticateRoutes.post("/sessions", authenticateUserController.handle)