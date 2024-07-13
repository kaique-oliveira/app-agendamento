import { IStore, IStoreFull } from '../Interfaces';
import { api } from '../libs/api';

class StoreServices {
  async postStore(store: IStore) {
    try {
      const formData = new FormData();
      formData.append('name', store.name);
      formData.append('cnpj', store.cnpj);
      formData.append('email', store.email);
      formData.append('password', store.password);
      formData.append('img', store.img!);

      const res = await api.post('store/create-store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async getStoreByEmail(email: string) {
    try {
      const res = await api.get(`store/store-by-email?email=${email}`);

      return res.data as IStoreFull;
    } catch (error) {
      console.log(error);
    }
  }
}

export const storeServices = new StoreServices();
