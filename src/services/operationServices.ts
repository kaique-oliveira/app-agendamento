import { CustomError } from '../helper/customError';
import { objectHelper } from '../helper/objectHelper';
import { ICreateOperationHour } from '../interfaces';
import dbCosmo from '../libs';

class OperatioServices {
  async save(
    operation: ICreateOperationHour,
    daysWeekIndex: number[],
    storeId: number,
  ) {
    try {
      const res = await dbCosmo.operationHour.create({
        data: {
          ...operation,
          store: { connect: { id: storeId } },
        },
      });

      console.log(res);
      const daysWeek = await dbCosmo.dayWeek.findMany();

      for (const indexWeek of daysWeekIndex) {
        await dbCosmo.relDayWeekOperation.create({
          data: {
            operationHourId: res.id,
            dayWeekId: daysWeek.find((x) => x.index === indexWeek)!.id,
          },
        });
      }

      return 'horário de funcionamento adicionado.';
    } catch (error) {
      console.log(error);
      throw new CustomError(JSON.stringify(error), 500);
    }
  }
  async findAll() {
    try {
      const res = await dbCosmo.dayWeek.findMany({
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
}

export const operationServices = new OperatioServices();
