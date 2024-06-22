import { Prisma } from '@prisma/client';
import { cryptHelper } from '../helper/cryptHelper';
import { ICreateStore, ISelectStore, IUpdateStore } from '../interfaces';
import dbCosmo from '../libs';
import { CustomError } from '../helper/customError';
import { objectHelper } from '../helper/objectHelper';

class StoreServices {
  async save(store: ICreateStore) {
    try {
      store.password = await cryptHelper.encrypt(store.password);

      const res = await dbCosmo.store.create({ data: store });

      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const key = error.meta?.target as keyof typeof store;

          throw new CustomError(`${store[key]}, já está em uso.`, 409);
        } else {
          throw new CustomError(
            `erro conhecido do Prisma:, ${error.message}`,
            502,
          );
        }
      } else {
        throw new CustomError(`erro desconhecido: ${error}`, 500);
      }
    }
  }
  async findAll() {
    try {
      const res = await dbCosmo.store.findMany({
        orderBy: { name: 'asc' },
        include: {
          address: true,
          operationHour: {
            select: {
              open: true,
              close: true,
              relDayWeekOperation: {
                select: {
                  dayWeek: {
                    select: {
                      day: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const result = res.map((r) => ({
        ...r,
        password: undefined,
        operation: r.operationHour.map((o) => ({
          daysWeek: o.relDayWeekOperation.map((w) => w.dayWeek.day),
          open: o.open,
          close: o.close,
        })),
        operationHour: undefined,
      }));

      return result;
    } catch (error) {
      throw new CustomError(`erro ao tentar buscar todas as lojas.`, 400);
    }
  }
  async findByEmail(email: string) {
    try {
      const res = await dbCosmo.store.findUnique({
        include: {
          address: true,
          operationHour: {
            select: {
              open: true,
              close: true,
              relDayWeekOperation: {
                select: {
                  dayWeek: {
                    select: {
                      day: true,
                    },
                  },
                },
              },
            },
          },
        },
        where: { email },
      });

      const result = {
        ...res,
        operation: res?.operationHour.map((o) => ({
          daysWeek: o.relDayWeekOperation.map((w) => w.dayWeek.day),
          open: o.open,
          close: o.close,
        })),
        operationHour: undefined,
      };
      return objectHelper.omit(result, 'password');
    } catch (error) {
      throw new CustomError(`erro ao tentar buscar a loja.`, 400);
    }
  }
  async findById(id: number) {
    try {
      const res = (await dbCosmo.store.findUnique({
        where: { id },
      })) as ISelectStore;

      return res;
    } catch (error) {
      throw new CustomError(`erro ao tentar buscar a loja.`, 400);
    }
  }
  async update(store: IUpdateStore, id: number) {
    try {
      const existStore = await dbCosmo.store.findUnique({ where: { id } });

      if (!existStore) {
        throw new CustomError('loja não encontrada.', 404);
      }

      const res = await dbCosmo.store.update({
        data: store,
        where: { id: id },
      });

      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const key = error.meta?.target as keyof typeof store;

          throw new CustomError(`${store[key]}, já está em uso.`, 409);
        } else if (error instanceof CustomError) {
          throw new CustomError(
            `erro conhecido do Prisma:, ${error.message}`,
            502,
          );
        } else {
          throw new CustomError(
            `Erro conhecido do Prisma:, ${error.message}`,
            502,
          );
        }
      } else if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(`error desconhecido: ${error}`, 500);
      }
    }
  }
  async delete(id: number) {
    try {
      const existStore = await dbCosmo.store.findUnique({ where: { id } });

      if (!existStore) {
        throw new CustomError('loja não encontrada.', 404);
      }

      await dbCosmo.store.delete({ where: { id } });

      return { message: 'loja deletada.' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new CustomError(
          `erro desconhecido do Prisma:, ${error.message}`,
          502,
        );
      } else if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(`error desconhecido: ${error}`, 500);
      }
    }
  }
}

export const storeServices = new StoreServices();
