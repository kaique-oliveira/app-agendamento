import { CustomError } from '../helper/customError';
import { ICreateSchedulableItem, IUpdateSchedulableItem } from '../interfaces';
import dbCosmo from '../libs';

class SchedulableItemsServices {
  async save(item: ICreateSchedulableItem) {
    try {
      const res = await dbCosmo.schedulableItem.create({ data: item });

      return res;
    } catch (error) {
      throw new CustomError('erro ao tentar criar o item.', 502);
    }
  }
  async findAllItems() {
    try {
      const res = await dbCosmo.schedulableItem.findMany();

      return res;
    } catch (error) {
      throw new CustomError('erro ao tentar buscar os itens.', 502);
    }
  }
  async findOneItem(itemId: number) {
    try {
      const res = await dbCosmo.schedulableItem.findUnique({
        where: { id: itemId },
      });

      if (!res) {
        throw new CustomError('item não encontrado.', 404);
      }

      return res;
    } catch (error) {
      throw new CustomError('erro ao tentar buscar os itens.', 502);
    }
  }
  async update(item: IUpdateSchedulableItem, itemId: number) {
    try {
      const res = await dbCosmo.schedulableItem.update({
        data: item,
        where: { id: itemId },
      });

      return res;
    } catch (error) {
      throw new CustomError('erro ao tentar atualizar o item.', 502);
    }
  }
  async delete(itemId: number) {
    try {
      const res = await dbCosmo.schedulableItem.delete({
        where: { id: itemId },
      });

      return res;
    } catch (error) {
      throw new CustomError('erro ao tentar deletar o item.', 502);
    }
  }
}

export const schedulableItemServices = new SchedulableItemsServices();
