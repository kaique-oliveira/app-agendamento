import express from 'express';
import { authController } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post('/login', authController.login);
authRouter.post('/token-is-valid', authController.tokenIsValid);
authRouter.put('/change-password', authController.changePassword);
