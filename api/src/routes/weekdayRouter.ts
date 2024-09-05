import express from 'express';
import { weekDayController } from '../controllers/weekdayController';

export const weekDayRouter = express.Router();

weekDayRouter.get('/all-day', weekDayController.allDay);
