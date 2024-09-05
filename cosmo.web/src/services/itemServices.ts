import { IItem } from '../Interfaces';
import { api } from '../libs/api';
import { Features } from '../pages/Setting';

class ItemServices {
  async save(name: string, description: string, features: Features[]) {
    const res = await api.post('item/create-item', {
      name,
      description,
      type: 'COURT',
      specificAttributes: JSON.stringify(features),
    });

    return res;
  }
  async getItems() {
    const res = await api.get('item/get-all-items');

    return res.data as IItem[];
  }
  async deleteItem(itemId: number) {
    const res = await api.delete('item/delete-item?itemId=' + itemId);

    return res.data as { message: string };
  }
  async updateItem(
    itemId: number,
    name: string,
    description: string,
    features: Features[]
  ) {
    const res = await api.put('item/update-item?itemId=' + itemId, {
      name,
      description,
      type: 'COURT',
      specificAttributes: JSON.stringify(features),
    });

    return res.data as { message: string };
  }
}

export const itemServices = new ItemServices();
