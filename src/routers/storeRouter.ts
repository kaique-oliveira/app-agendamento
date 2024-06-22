import express from 'express';
import { storeController } from '../controllers/storeController';

export const storeRouter = express.Router();

storeRouter.post('/create-store', storeController.postStore);
storeRouter.get('/all-stores', storeController.getStores);
storeRouter.get('/store-by-email', storeController.getStoreByEmail);
storeRouter.put('/update-store', storeController.putStore);
storeRouter.delete('/delete-store', storeController.deleteStore);
