import { Request, Response } from 'express';
import { CustomError } from '../helper/customError';
import { weekDayServices } from '../services/weekDayServices';

class WeekDayController {
  async allDay(req: Request, res: Response) {
    try {
      const weekDays = await weekDayServices.getAll();

      res.status(200).json(weekDays);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export const weekDayController = new WeekDayController();
