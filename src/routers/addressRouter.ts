import express from 'express';
import { addressController } from '../controllers/addressController';

export const addressRouter = express.Router();

addressRouter.post('/create-address', addressController.postAddress);
addressRouter.put('/update-address', addressController.putAddress);
