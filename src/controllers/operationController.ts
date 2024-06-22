import { Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { operationServices } from '../services/operationServices';
import { CustomError } from '../helper/customError';
import { objectHelper } from '../helper/objectHelper';

const createSchema = z.object({
  open: z
    .string({
      message: 'horário de abertura deve ser um texto',
    })
    .min(5, { message: 'horário de abertura é um campo obrigatório.' }),
  close: z
    .string({
      message: 'horário de fechamento deve ser um texto',
    })
    .min(5, { message: 'horário de fechamento é um campo obrigatório.' }),
  daysWeek: z
    .array(z.number({ message: 'deve conter apenas números.' }))
    .min(1, { message: 'deve conter ao menos um id do dia da semana.' }),
});

class OperationController {
  async postOperation(req: Request, res: Response) {
    try {
      const { storeId } = req.query;

      const validation = createSchema.safeParse(req.body);

      if (!storeId) {
        throw new CustomError('o id da loja é obrigatório', 409);
      }

      if (validation.error) {
        throw validation.error;
      }

      const response = await operationServices.save(
        objectHelper.omit(validation.data, 'daysWeek'),
        validation.data.daysWeek,
        Number(storeId),
      );

      res.status(201).json({ message: response });
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
  async getAll(req: Request, res: Response) {
    try {
      const reponse = await operationServices.findAll();

      res.status(200).json(reponse);
    } catch (error) {
      const err = error as CustomError;

      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export const operationController = new OperationController();
