import { Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { storeServices } from '../services/storeServices';
import { CustomError } from '../helper/customError';
import { ICreateStore } from '../interfaces';

const updateSchema = z.object({
  name: z
    .string({ message: 'O nome deve ser um texto.' })
    .min(4, { message: 'O nome é um campo obrigatório.' }),
  cnpj: z
    .string({ message: 'O CNPJ deve ser um texto.' })
    .min(4, { message: 'O CNPJ é um campo obrigatório.' }),
  imgUrl: z.string().nullable(),
  email: z
    .string()
    .email({ message: 'O e-mail está inválido.' })
    .min(8, { message: 'O e-mail é um campo obrigatório.' }),
});

const createSchema = z.object({
  name: z
    .string({ message: 'o nome deve ser um texto.' })
    .min(4, { message: 'o nome é um campo obrigatório.' }),
  cnpj: z
    .string({ message: 'o CNPJ deve ser um texto.' })
    .min(4, { message: 'o CNPJ é um campo obrigatório.' }),
  img: z
    .object({
      buffer: z.instanceof(Buffer),
      originalname: z.string(),
    })
    .optional(),
  email: z
    .string()
    .email({ message: 'o e-mail está inválido.' })
    .min(8, { message: 'o e-mail é um campo obrigatório.' }),
  password: z
    .string({ message: 'a senha deve ser um texto.' })
    .min(8, { message: 'A senha é um campo obrigatório.' }),
});

interface UploadRequest extends Request {
  body: {
    name: string;
    cnpj: string;
    email: string;
    senha: string;
  };
  img: {
    buffer: Buffer;
    originalname: string;
  };
}

class StoreController {
  async postStore(req: Request, res: Response) {
    const file = req.file?.buffer;

    try {
      const validation = createSchema.safeParse(req.body);

      if (validation.error) {
        throw validation.error;
      }

      const response = await storeServices.save(
        validation.data as ICreateStore,
        file!,
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
  async getStores(req: Request, res: Response) {
    try {
      const response = await storeServices.findAll();

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async getStoreByEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;

      if (!email) {
        throw new CustomError(`o e-mail é obrigatório.`, 409);
      }

      const val = z.string().email().safeParse(email);

      if (val.error) {
        throw new CustomError(`e-mail inválido.`, 409);
      }

      const response = await storeServices.findByEmail(String(email));

      if (!response) {
        throw new CustomError(`loja não encontrada.`, 404);
      }

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async putStore(req: Request, res: Response) {
    try {
      const validation = updateSchema.safeParse(req.body);
      const { id } = req.query;

      if (!id) {
        throw new CustomError('o id é obrigatório.', 409);
      }

      if (validation.error) {
        throw validation.error;
      }

      if (validation.data.imgUrl) {
        const isUrl = z
          .string()
          .url({ message: 'URL da imagem inválida.' })
          .safeParse(validation.data.imgUrl);

        if (isUrl.error) {
          throw isUrl.error;
        }
      }

      const response = await storeServices.update(validation.data, Number(id));

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
  async deleteStore(req: Request, res: Response) {
    try {
      const { id } = req.query;

      if (!id) {
        throw new CustomError('o id é obrigatório.', 409);
      }

      const response = await storeServices.delete(Number(id));

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;
      res.status(err.statusCode).json({ message: err.message });
    }
  }
}

export const storeController = new StoreController();
