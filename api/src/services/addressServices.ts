import { CustomError } from '../helper/customError';
import { ICreateAddress, ISelectAddress, IUpdateAddress } from '../interfaces';
import dbAgendamento from '../libs';

class AddressServices {
  async save(address: ICreateAddress, storeId: number) {
    try {
      const res = await dbAgendamento.address.create({
        data: {
          ...address,
          store: {
            connect: {
              id: storeId,
            },
          },
        },
      });

      return res;
    } catch (error) {
      throw new CustomError(`erro desconhecido: ${error}`, 500);
    }
  }
  async update(address: IUpdateAddress, id: number) {
    try {
      const res = await dbAgendamento.address.update({
        data: address,
        where: { id },
      });

      return res;
    } catch (error) {
      throw new CustomError(`erro desconhecido: ${error}`, 500);
    }
  }
  async findById(id: number) {
    try {
      const res = (await dbAgendamento.address.findUnique({
        where: { id },
      })) as ISelectAddress;

      return res;
    } catch (error) {
      throw new CustomError(`erro desconhecido: ${error}`, 500);
    }
  }
}

export const addressServices = new AddressServices();
