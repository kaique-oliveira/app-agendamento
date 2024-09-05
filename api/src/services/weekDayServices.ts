import dbCosmo from '../libs';

class WeekDayServices {
  async getAll() {
    try {
      const res = await dbCosmo.dayWeek.findMany({
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
