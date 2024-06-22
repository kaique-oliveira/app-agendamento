import { Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { CustomError } from '../helper/customError';
import { schedulableItemServices } from '../services/schedulableItemsServices';
import { ICreateSchedulableItem, IUpdateSchedulableItem } from '../interfaces';

const schemaPostItem = z.object({
  name: z
    .string({
      message: 'nome do item deve ser um texto',
    })
    .min(2, { message: 'nome do item é um campo obrigatório.' }),
  description: z
    .string({
      message: 'descrição do item deve ser um texto',
    })
    .nullable(),
  type: z.enum(['CAR', 'HOUSE', 'COURT'], {
    message: "o tipo dever ser uma das opções ['CAR', 'HOUSE', 'COURT']",
  }),
  specificAttributes: z.union([z.any(), z.null()]),
});

class SchedulableItemController {
  async postItem(req: Request, res: Response) {
    try {
      const validation = schemaPostItem.safeParse(req.body);

      if (validation.error) {
        throw validation.error;
      }

      const response = await schedulableItemServices.save(
        validation.data as ICreateSchedulableItem,
      );

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
  async getAllItems(req: Request, res: Response) {
    try {
      const response = await schedulableItemServices.findAllItems();

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async getOneItem(req: Request, res: Response) {
    try {
      const { itemId } = req.query;

      if (!itemId) {
        throw new CustomError('o id do item é obrigatório.', 409);
      }

      const response = await schedulableItemServices.findOneItem(
        Number(itemId),
      );

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async updateItem(req: Request, res: Response) {
    try {
      const { itemId } = req.query;
      const validation = schemaPostItem.safeParse(req.body);

      if (!itemId) {
        throw new CustomError('o id do item é obrigatório.', 409);
      }

      if (validation.error) {
        throw validation.error;
      }

      const response = await schedulableItemServices.update(
        validation.data as IUpdateSchedulableItem,
        Number(itemId),
      );

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
  async deleteItem(req: Request, res: Response) {
    try {
      const { itemId } = req.query;

      if (!itemId) {
        throw new CustomError('o id do item é obrigatório.', 409);
      }

      const response = await schedulableItemServices.delete(Number(itemId));

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export const schedulableItemsController = new SchedulableItemController();
