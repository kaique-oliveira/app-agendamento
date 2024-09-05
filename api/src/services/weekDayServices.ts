import dbAgendamento from '../libs';

class WeekDayServices {
  async getAll() {
    try {
      const res = await dbAgendamento.dayWeek.findMany({
        select: {
          id: true,
          day: true,
          index: true,
        },
      });

      return res;
    } catch (error) {
      throw error;
    }
  }
}

export const weekDayServices = new WeekDayServices();
