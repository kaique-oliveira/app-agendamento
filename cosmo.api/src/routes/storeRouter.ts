import express from 'express';
import { storeController } from '../controllers/storeController';
import multer from 'multer';

export const storeRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

storeRouter.post(
  '/create-store',
  upload.single('img'),
  storeController.postStore,
);
storeRouter.get('/all-stores', storeController.getStores);
storeRouter.get('/store-by-email', storeController.getStoreByEmail);
storeRouter.put('/update-store', storeController.putStore);
storeRouter.delete('/delete-store', storeController.deleteStore);
storeRouter.get('/available', storeController.availableTime);
storeRouter.put('/edit-image', upload.single('img'), storeController.editImage);
