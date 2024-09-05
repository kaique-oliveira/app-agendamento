import { IStore, IStoreFull, IUser } from '../Interfaces';
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
  async availableTimes(date: string, itemId: number) {
    const res = await api.get(
      `store/available?date='${date}'&itemId=${itemId}`
    );

    return res.data as string[];
  }
  async updateProfile(store: IStoreFull) {
    const res = await api.put(`store/update-store?id=${store.id}`, {
      name: store.name,
      cnpj: store.cnpj,
      email: store.email,
    });

    window.localStorage.setItem('user', JSON.stringify(res.data as IUser));

    await api.put(`address/update-address?addressId=${store.address.id}`, {
      street: store.address.street,
      neighborhood: store.address.neighborhood,
      zipCode: store.address.zipCode,
      city: store.address.city,
      uf: store.address.uf,
      number: store.address.number,
    });

    return res.data as IUser;
  }
  async editImage(storeId: number, image: File, email: string) {
    const formData = new FormData();
    formData.append('img', image);

    await api.put(`store/edit-image?storeId=${storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const user = await this.getStoreByEmail(email);

    return {
      name: user?.name,
      email: user?.email,
      cnpj: user?.cnpj,
      img: user?.img,
    } as IUser;
  }
}

export const storeServices = new StoreServices();

//
