import { CustomError } from '../helper/customError';
import { ICreateOperationHour } from '../interfaces';
import dbAgendamento from '../libs';

class OperatioServices {
  async save(
    operation: ICreateOperationHour,
    daysWeekIndex: number[],
    storeId: number,
  ) {
    try {
      const daysWeek = await dbAgendamento.dayWeek.findMany();

      for await (const indexWeek of daysWeekIndex) {
        const res = await dbAgendamento.operationHour.create({
          data: {
            ...operation,
            store: { connect: { id: storeId } },
          },
        });

        await dbAgendamento.relDayWeekOperation.create({
          data: {
            operationHourId: res.id,
            dayWeekId: daysWeek.find((x) => x.index === indexWeek)!.id,
          },
        });
      }

      // for (const indexWeek of daysWeekIndex) {

      // }

      return 'horário de funcionamento adicionado.';
    } catch (error) {
      console.log(error);
      throw new CustomError(JSON.stringify(error), 500);
    }
  }
  async findAll() {
    try {
      const res = await dbAgendamento.dayWeek.findMany({
        include: {
          relDayWeekOperation: {
            select: {
              operationHour: {
                select: {
                  id: true,
                  open: true,
                  close: true,
                },
              },
            },
          },
        },
      });
      const format = res.map((dayWeek) => ({
        ...dayWeek,
        operationsHour: dayWeek.relDayWeekOperation.map((rel) => ({
          id: rel.operationHour.id,
          open: rel.operationHour.open,
          close: rel.operationHour.close,
        })),
        relDayWeekOperation: undefined,
      }));

      return format;
    } catch (error) {
      throw new CustomError(
        'houve um erro ao tentar buscar os dias de funcionamento.',
        502,
      );
    }
  }
  async update(relOperationId: number, open: string, close: string) {
    try {
      const relOp = await dbAgendamento.relDayWeekOperation.findUnique({
        where: { id: Number(relOperationId) },
        select: {
          operationHour: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!relOp || !relOp.operationHour.id) {
        throw new CustomError('horário não encontrado.', 404);
      }

      await dbAgendamento.operationHour.update({
        where: { id: Number(relOp.operationHour.id) },
        data: { open: open, close: close },
      });
    } catch (error) {
      throw error;
    }
  }
  async delete(relOperationId: number) {
    try {
      const relOp = await dbAgendamento.relDayWeekOperation.findUnique({
        where: { id: Number(relOperationId) },
        select: {
          id: true,
        },
      });

      if (!relOp) {
        throw new CustomError('horário não encontrado.', 404);
      }

      await dbAgendamento.relDayWeekOperation.delete({
        where: { id: Number(relOperationId) },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const operationServices = new OperatioServices();
