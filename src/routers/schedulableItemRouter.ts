import express from 'express';
import { schedulableItemsController } from '../controllers/schedulableItemController';

export const itemRouter = express.Router();

itemRouter.post('/create-item', schedulableItemsController.postItem);
itemRouter.get('/get-all-items', schedulableItemsController.getAllItems);
itemRouter.get('/get-one-item', schedulableItemsController.getOneItem);
itemRouter.put('/update-item', schedulableItemsController.updateItem);
itemRouter.delete('/delete-item', schedulableItemsController.deleteItem);
