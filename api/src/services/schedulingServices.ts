import { CustomError } from '../helper/customError';
import { formatHelper } from '../helper/formatHelper';
import { ICreateScheduling, IUpdateScheduling } from '../interfaces';
import dbAgendamento from '../libs';

class SchedulingServices {
  async saveScheduling(scheduling: ICreateScheduling, itemId: number) {
    try {
      scheduling.date = formatHelper.formatDate(scheduling.date);
      scheduling.startTime = formatHelper.formatHour(scheduling.startTime);
      scheduling.endTime = formatHelper.formatHour(scheduling.endTime);

      if (
        await this.checkScheduling(
          scheduling.date,
          scheduling.startTime,
          scheduling.endTime,
          itemId,
        )
      ) {
        const res = await dbAgendamento.scheduling.create({
          data: {
            ...scheduling,
            itemSchedulable: {
              connect: { id: itemId },
            },
          },
        });

        return res;
      }

      return null;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('erro ao tentar salvar o agendamento.', 502);
    }
  }
  async updateScheduling(
    scheduling: IUpdateScheduling,
    idScheduling: number,
    itemId: number,
  ) {
    try {
      scheduling.date = formatHelper.formatDate(scheduling.date as string);
      scheduling.startTime = formatHelper.formatHour(
        scheduling.startTime as string,
      );
      scheduling.endTime = formatHelper.formatHour(
        scheduling.endTime as string,
      );

      // const item = dbAgendamento.schedulableItem.findUnique({
      //   where: { id: itemId },
      // });
      // scheduling.itemSchedulable = { connect: { id: itemId } };

      if (
        await this.checkScheduling(
          scheduling.date,
          scheduling.startTime,
          scheduling.endTime,
          itemId,
        )
      ) {
        const res = await dbAgendamento.scheduling.update({
          data: {
            ...scheduling,
            itemSchedulable: {
              connect: { id: itemId },
            },
          },
          where: {
            id: idScheduling,
          },
        });

        return res;
      }

      return null;
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('erro ao tentar salvar o agendamento.', 502);
    }
  }
  async checkScheduling(
    date: string,
    startTime: string,
    endTime: string,
    itemId: number,
  ) {
    try {
      let schedule = await dbAgendamento.scheduling.findFirst({
        where: {
          date: date,
          startTime: {
            lte: startTime, // horaInicio do agendamento é menor ou igual à hora de início passada
          },
          endTime: {
            gte: endTime, // horaFim do agendamento é maior ou igual à hora de fim passada
          },
          itemSchedulable: { id: Number(itemId) },
        },
      });

      if (schedule) {
        return false;
      }

      schedule = await dbAgendamento.scheduling.findFirst({
        where: {
          date: date,
          startTime: {
            gte: startTime, // horaFim do agendamento é maior ou igual à hora de fim passada
          },
          endTime: {
            lte: endTime, // horaInicio do agendamento é menor ou igual à hora de início passada
          },
          itemSchedulable: { id: Number(itemId) },
        },
      });

      if (schedule) {
        return false;
      }

      schedule = await dbAgendamento.scheduling.findFirst({
        where: {
          date: date,
          startTime: {
            lt: endTime, // horaInicio do agendamento é menor
          },
          endTime: {
            gt: startTime, // horaFim do agendamento é maior
          },
          itemSchedulable: { id: Number(itemId) },
        },
      });

      return !schedule ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async findSchedulings(date: string) {
    try {
      const dateF = formatHelper.formatDate(date);

      const schedulings = await dbAgendamento.scheduling.findMany({
        where: {
          date: dateF,
        },
      });

      return schedulings;
    } catch (error) {
      throw new CustomError('erro ao tentar buscar os agendamentos.', 502);
    }
  }
  async deleteScheduling(id: number) {
    try {
      await dbAgendamento.scheduling.delete({ where: { id: id } });

      return 'agendamento deletado';
    } catch (error) {
      throw new CustomError('erro ao tentar deletar o agendamento.', 502);
    }
  }
}

export const schedulingServices = new SchedulingServices();
