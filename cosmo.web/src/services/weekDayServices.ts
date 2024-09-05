import { IWeekDays } from '../Interfaces';
import { api } from '../libs/api';

class WeekDayServices {
  async getItems() {
    const res = await api.get('weekday/all-day');

    return res.data as IWeekDays[];
  }
}

export const weekDayServices = new WeekDayServices();
