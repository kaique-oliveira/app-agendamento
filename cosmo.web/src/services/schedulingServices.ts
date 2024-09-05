import { IScheduling } from '../Interfaces';
import { api } from '../libs/api';

class SchedulingServices {
  async create(itemId: number, scheduling: IScheduling) {
    const res = await api.post(
      'scheduling/create-scheduling?itemId=' + itemId,
      scheduling
    );

    return res.data as IScheduling;
  }
}

export const schedulingServices = new SchedulingServices();
