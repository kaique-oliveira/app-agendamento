import { Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { addressServices } from '../services/addressServices';
import { storeServices } from '../services/storeServices';
import { CustomError } from '../helper/customError';
import { ICreateAddress, IUpdateAddress } from '../interfaces';

const createSchema = z.object({
  street: z
    .string({
      message: 'rua deve ser um texto',
    })
    .min(10, { message: 'rua é um campo obrigatório.' }),
  neighborhood: z
    .string({
      message: 'bairro deve ser um texto',
    })
    .min(4, { message: 'bairro é um campo obrigatório.' }),
  zipCode: z
    .number({
      message: 'cep deve ser um número.',
    })
    .min(8, { message: 'bairro é um campo obrigatório.' }),
  city: z
    .string({
      message: 'cidade deve ser um texto.',
    })
    .min(4, { message: 'cidade é um campo obrigatório.' }),
  uf: z
    .string({
      message: 'estado deve ser um texto.',
    })
    .min(2, { message: 'estado é um campo obrigatório de dois caracters.' })
    .max(2, { message: 'estado é um campo obrigatório de dois caracters.' }),
  number: z.number({
    message: 'número é um campo obrigatório.',
  }),
});

class AddressController {
  async postAddress(req: Request, res: Response) {
    try {
      const { storeId } = req.query;
      const validation = createSchema.safeParse(req.body);

      const store = await storeServices.findById(Number(storeId));

      if (!store) {
        throw new CustomError('id da loja não existe.', 404);
      }

      if (validation.error) {
        throw validation.error;
      }

      const response = await addressServices.save(
        validation.data as ICreateAddress,
        Number(storeId),
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
  async putAddress(req: Request, res: Response) {
    try {
      const { addressId } = req.query;
      const validation = createSchema.safeParse(req.body);

      const address = await addressServices.findById(Number(addressId));

      if (!address) {
        throw new CustomError('id do endereço não existe.', 404);
      }

      if (validation.error) {
        throw validation.error;
      }

      const response = await addressServices.update(
        validation.data as IUpdateAddress,
        Number(addressId),
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
}

export const addressController = new AddressController();
