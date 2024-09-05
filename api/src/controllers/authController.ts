import { Request, Response } from 'express';
import { authServices } from '../services/authServices';
import { CustomError } from '../helper/customError';
import { authHelper } from '../helper/authHelper';
import z, { ZodError } from 'zod';

const resetPasswordSchema = z.object({
  storeId: z
    .number({ message: 'o id da loja deve ser um número.' })
    .min(1, { message: 'a senha é um campo obrigatório.' }),
  oldPassword: z
    .string({ message: 'a senha deve ser um texto.' })
    .min(8, { message: 'a senha é um campo obrigatório.' }),
  newPassword: z
    .string({ message: 'a senha deve ser um texto.' })
    .min(8, { message: 'a senha é um campo obrigatório.' }),
});

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(409).json({ message: 'e-mail é obrigatório.' });
      }

      if (!password) {
        return res.status(409).json({ message: 'senha é obrigatório.' });
      }

      const response = await authServices.login(email, password);

      res.status(200).json(response);
    } catch (error) {
      const err = error as CustomError;

      res.status(err.statusCode).json({ message: err.message });
    }
  }
  async tokenIsValid(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        throw new CustomError('token é obrigatório.', 400);
      }

      const response = await authHelper.validateToken(token);

      res.status(200).json({ token: token, isValid: response });
    } catch (error) {
      const err = error as CustomError;

      res.status(err.statusCode).json(err.message);
    }
  }
  async changePassword(req: Request, res: Response) {
    try {
      const validation = resetPasswordSchema.safeParse(req.body);

      if (validation.error) {
        throw validation.error;
      }

      const response = await authServices.changePassword(
        validation.data.storeId,
        validation.data.oldPassword,
        validation.data.newPassword,
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
}

export const authController = new AuthController();
