import { Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { CustomError } from '../helper/customError';
import { schedulingServices } from '../services/schedulingServices';
import { ICreateScheduling, IUpdateScheduling } from '../interfaces';
import { objectHelper } from '../helper/objectHelper';

const schemaCreateSchedule = z.object({
  date: z
    .string({
      message: 'data deve ser um texto no formato (2024-06-22T15:00:00.000Z).',
    })
    .min(20, { message: 'data é um campo obrigatório.' }),
  startTime: z
    .string({
      message: 'horário de inicio deve ser um texto no formato (00:00).',
    })
    .min(5, { message: 'horário de inicio é um campo obrigatório.' }),
  endTime: z
    .string({
      message: 'horário de término deve ser um texto no formato (00:00).',
    })
    .min(5, { message: 'horário de término é um campo obrigatório.' }),
  ownerScheduled: z
    .string({ message: 'dono do agendamento deve ser um texto.' })
    .min(2, { message: 'dono do agendamento é um campo obrigatório.' }),
  clientId: z.number({ message: 'data deve ser um número.' }).optional(),
});

const schemaUpdateScheduling = z.object({
  date: z
    .string({
      message: 'data deve ser um texto no formato (2024-06-22T15:00:00.000Z).',
    })
    .min(20, { message: 'data é um campo obrigatório.' }),
  startTime: z
    .string({
      message: 'horário de inicio deve ser um texto no formato (00:00).',
    })
    .min(5, { message: 'horário de inicio é um campo obrigatório.' }),
  endTime: z
    .string({
      message: 'horário de término deve ser um texto no formato (00:00).',
    })
    .min(5, { message: 'horário de término é um campo obrigatório.' }),
  ownerScheduled: z
    .string({ message: 'dono do agendamento deve ser um texto.' })
    .min(2, { message: 'dono do agendamento é um campo obrigatório.' }),
  clientId: z.number({ message: 'data deve ser um número.' }).optional(),
  itemId: z.number({ message: 'id do item deve ser um número.' }).nullable(),
});

class SchedulingController {
  async createSchedule(req: Request, res: Response) {
    try {
      const { itemId } = req.query;
      const validation = schemaCreateSchedule.safeParse(req.body);

      if (validation.error) {
        throw validation.error;
      }

      if (!itemId) {
        throw new CustomError('o id do item é obrigatório', 409);
      }

      const response = await schedulingServices.saveScheduling(
        validation.data as ICreateScheduling,
        Number(itemId),
      );

      if (!response) {
        throw new CustomError('data e horário não disponivel.', 409);
      }

      res.status(201).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(405).json({
          validation: error.issues.map((i) => ({ message: i.message })),
        });
      } else {
        const err = error as CustomError;
        res.status(err.statusCode).json({ message: err.message });
      }
    }
  }
  async getSchedulings(req: Request, res: Response) {
    try {
      const { date } = req.query;

      if (!date) {
        throw new CustomError('data é obrigatório.', 409);
      }

      const response = await schedulingServices.findSchedulings(date as string);

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async updateScheduling(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const validation = schemaUpdateScheduling.safeParse(req.body);

      if (validation.error) {
        throw validation.error;
      }

      if (!id) {
        throw new CustomError('id é obrigatório.', 409);
      }

      const itemId = validation.data.itemId;

      const response = await schedulingServices.updateScheduling(
        objectHelper.omit(validation.data, 'itemId') as IUpdateScheduling,
        Number(id),
        Number(itemId),
      );

      if (!response) {
        throw new CustomError('data e horário não disponivel.', 409);
      }

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(405).json({
          validation: error.issues.map((i) => ({ message: i.message })),
        });
      } else {
        const err = error as CustomError;
        res.status(err.statusCode).json({ message: err.message });
      }
    }
  }
  async deleteScheduling(req: Request, res: Response) {
    try {
      const { id } = req.query;

      if (!id) {
        throw new CustomError('id é obrigatório.', 409);
      }

      const response = await schedulingServices.deleteScheduling(Number(id));

      res.status(200).json({ message: response });
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export const schedulingController = new SchedulingController();
