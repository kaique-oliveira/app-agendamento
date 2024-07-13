import jwt from 'jsonwebtoken';
import { ISelectStore } from '../interfaces';
import { CustomError } from './customError';

class AuthHelper {
  async createToken(store: ISelectStore) {
    try {
      const token = jwt.sign(
        {
          name: store.name,
          cnpj: store.cnpj,
          email: store.email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' },
      );

      return token;
    } catch (error) {
      throw new CustomError('erro ao tentar criar o token.', 400);
    }
  }
  async validateToken(token: string) {
    try {
      let isValided = false;

      if (token) {
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
          (err) => {
            if (err) {
              console.log('erro', err);
            } else {
              isValided = true;
            }
          },
        );
      }

      return isValided;
    } catch (error) {
      throw new CustomError(error as string, 400);
    }
  }
  async getPayload(token: string) {
    try {
      if (token) {
        type PayloadType = {
          name: string;
          cnpj: string;
          email: string;
        };

        try {
          const payload: PayloadType | void = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            (err) => {},
          );

          return payload;
        } catch (error) {
          return {};
        }
      }

      return {};
    } catch (error) {
      throw new CustomError(error as string, 400);
    }
  }
}

export const authHelper = new AuthHelper();
