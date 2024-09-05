import express from 'express';
import { operationController } from '../controllers/operationController';

export const operationRouter = express.Router();

operationRouter.post('/create-operation', operationController.postOperation);
operationRouter.get('/get-all', operationController.getAll);
operationRouter.put('/update-operation', operationController.updateOperation);
operationRouter.delete(
  '/delete-operation',
  operationController.deleteOperation,
);
