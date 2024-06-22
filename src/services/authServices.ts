import { date } from 'zod';
import { authHelper } from '../helper/authHelper';
import { cryptHelper } from '../helper/cryptHelper';
import { CustomError } from '../helper/customError';
import dbCosmo from '../libs';
import { storeServices } from './storeServices';
import { objectHelper } from '../helper/objectHelper';

class AuthServices {
  async login(email: string, password: string) {
    try {
      const store = await dbCosmo.store.findUnique({ where: { email } });

      if (!store) {
        throw new CustomError('e-mail não encontrado.', 404);
      }
      const pass = await cryptHelper.compare(password, store.password);

      if (!pass) {
        throw new CustomError('senha inválida.', 404);
      }

      const token = await authHelper.createToken(store);

      return token;
    } catch (error) {
      throw error;
    }
  }
  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    try {
      const store = await storeServices.findById(id);

      const validation = await cryptHelper.compare(
        currentPassword,
        store.password,
      );

      if (!validation) {
        throw new CustomError('a senha atual está inválida.', 403);
      }

      store.password = await cryptHelper.encrypt(newPassword);

      await dbCosmo.store.update({
        data: objectHelper.omit(store, 'id'),
        where: { id: store.id },
      });

      return { message: 'a senha foi alterada.' };
    } catch (error) {
      throw new CustomError('erro ao tentar alterar a senha', 500);
    }
  }
}

export const authServices = new AuthServices();
