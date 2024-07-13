import { IItem } from '../Interfaces';
import { api } from '../libs/api';

class ItemServices {
  async getItems() {
    try {
      const res = await api.get('item/get-all-items');

      return res.data as IItem[];
    } catch (error) {
      console.log(error);
    }
  }
}

export const itemServices = new ItemServices();
