import { Prisma } from '@prisma/client';
import { cryptHelper } from '../helper/cryptHelper';
import { ICreateStore, ISelectStore, IUpdateStore } from '../interfaces';
import dbAgendamento from '../libs';
import { CustomError } from '../helper/customError';
import { objectHelper } from '../helper/objectHelper';
import { formatHelper } from '../helper/formatHelper';

class StoreServices {
  async save(store: ICreateStore, img: Buffer) {
    try {
      store.password = await cryptHelper.encrypt(store.password);

      store.img = [img];
      const res = await dbAgendamento.store.create({ data: store });

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
      const res = await dbAgendamento.store.findMany({
        orderBy: { name: 'asc' },
        include: {
          address: true,
          operationHour: {
            select: {
              open: true,
              close: true,
              relDayWeekOperation: {
                select: {
                  id: true,
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
          daysWeek: o.relDayWeekOperation.map((w) => {
            return {
              id: w.id,
              day: w.dayWeek.day,
            };
          }),
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
      const res = await dbAgendamento.store.findUnique({
        include: {
          address: true,
          operationHour: {
            select: {
              open: true,
              close: true,
              relDayWeekOperation: {
                select: {
                  id: true,
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
          daysWeek: o.relDayWeekOperation.map((w) => {
            return {
              id: w.id,
              day: w.dayWeek.day,
            };
          }),
          open: o.open,
          close: o.close,
        })),
        operationHour: undefined,
      };

      return objectHelper.omit(result, 'password');
    } catch (error) {
      console.log(error);
      throw new CustomError(`erro ao tentar buscar a loja.`, 400);
    }
  }
  async findById(id: number) {
    try {
      const res = (await dbAgendamento.store.findUnique({
        where: { id },
      })) as ISelectStore;

      return res;
    } catch (error) {
      throw new CustomError(`erro ao tentar buscar a loja.`, 400);
    }
  }
  async update(store: IUpdateStore, storeId: number) {
    try {
      const existStore = await dbAgendamento.store.findUnique({
        where: { id: Number(storeId) },
      });

      if (!existStore) {
        throw new CustomError('loja não encontrada.', 404);
      }

      const res = await dbAgendamento.store.update({
        data: store,
        where: { id: Number(storeId) },
      });

      return res;
    } catch (error) {
      console.log(error);

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
      const existStore = await dbAgendamento.store.findUnique({
        where: { id },
      });

      if (!existStore) {
        throw new CustomError('loja não encontrada.', 404);
      }

      await dbAgendamento.store.delete({ where: { id } });

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
  async availableTimes(date: string, itemId: number) {
    try {
      const index = new Date(date.split('T')[0]).getDay();

      const dayWeek = await dbAgendamento.dayWeek.findFirst({
        select: {
          relDayWeekOperation: {
            orderBy: { operationHour: { open: 'asc' } },
            select: {
              operationHour: {
                select: {
                  open: true,
                  close: true,
                },
              },
            },
          },
        },
        where: { index: index === 7 ? 1 : index + 1 },
      });

      if (
        dayWeek &&
        dayWeek.relDayWeekOperation &&
        dayWeek.relDayWeekOperation.length > 0
      ) {
        let listHours = [] as string[];

        for (const operation of dayWeek?.relDayWeekOperation) {
          const open = +operation.operationHour.open.split(':')[0];
          const close = +operation.operationHour.close.split(':')[0];

          for (let index = open; index <= close; index++) {
            listHours.push(`${index.toString().padStart(2, '0')}:00`);

            if (index === close) {
              listHours.push(`${(index + 1).toString().padStart(2, '0')}:00`);
            }

            if (index != close) {
              listHours.push(`${index.toString().padStart(2, '0')}:30`);
            }
          }
        }

        const scheduling = await dbAgendamento.scheduling.findMany({
          where: {
            AND: [
              { date: formatHelper.formatDate(date.split('T')[0]) },
              { itemSchedulable: { id: Number(itemId) } },
            ],
          },
          select: { startTime: true, endTime: true },
        });

        if (scheduling && scheduling.length > 0) {
          for (const schedule of scheduling) {
            const hourStart = schedule.startTime.split('T')[1].substring(0, 5);
            const hourEnd = schedule.endTime.split('T')[1].substring(0, 5);

            const indexStart = listHours.indexOf(hourStart);
            const indexEnd = listHours.indexOf(hourEnd);

            const quantRemove = indexEnd - indexStart + 1;

            listHours.splice(indexStart, quantRemove);
          }

          listHours.pop();
        }

        return listHours;
      }

      return [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateImage(storeId: number, img: Buffer) {
    try {
      const store = await this.findById(storeId);

      if (!store) {
        throw new CustomError('loja não encontrada.', 404);
      }

      await dbAgendamento.store.update({
        data: { img: [img] },
        where: { id: storeId },
      });
    } catch (error) {
      throw error;
    }
  }
}

export const storeServices = new StoreServices();
