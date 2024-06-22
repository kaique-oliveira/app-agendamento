import express from 'express';
import { schedulingController } from '../controllers/schedulingController';

export const schedulingRouter = express.Router();

schedulingRouter.post(
  '/create-scheduling',
  schedulingController.createSchedule,
);
schedulingRouter.get('/get-schedulings', schedulingController.getSchedulings);
schedulingRouter.put(
  '/update-scheduling',
  schedulingController.updateScheduling,
);
schedulingRouter.delete(
  '/delete-scheduling',
  schedulingController.deleteScheduling,
);
