import { api } from '../libs/api';

class OperationServices {
  async create(
    open: string,
    close: string,
    daysWeek: number[],
    storeId: number
  ) {
    const res = await api.post(
      'operation/create-operation?storeId=' + storeId,
      {
        open,
        close,
        daysWeek,
      }
    );

    return res.data;
  }
  async delete(scheduledId: string) {
    const res = await api.delete(
      'scheduling/delete-scheduling?id=' + scheduledId
    );

    return res.data;
  }
  async updateHour(relOperationId: number, open: string, close: string) {
    const res = await api.put('operation/update-operation', {
      relOperationId,
      open,
      close,
    });

    return res.data as { message: string };
  }
  async deleteHour(relOperationId: number) {
    const res = await api.delete(
      'operation/delete-operation?relOperationId=' + relOperationId
    );

    return res.data as { message: string };
  }
}

export const operationServices = new OperationServices();
