import { createContext, ReactElement, useEffect, useState } from 'react';
import { IItem, IStoreFull } from '../Interfaces';
import { useAuth } from './auth';
import { storeServices } from '../services/storeServices';
import { normalizeOperations } from '../helpers/normalizeOperation';
import { itemServices } from '../services/itemServices';
import { useToast } from '@chakra-ui/react';

type StoreType = {
  startHour: string;
  endHour: string;
  store: IStoreFull | null;
  items: IItem[] | [];
  fetchStore(): void;
  fetchItems(): void;
};

export const StoreContext = createContext<StoreType>(null!);

export function StoreProvider({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  const toast = useToast();

  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [store, setStore] = useState<IStoreFull | null>(null);
  const [items, setItems] = useState<IItem[] | []>([]);

  function getStartHour() {
    if (store && store.operation.length > 0) {
      const arrayH = normalizeOperations.normalize(store.operation);

      const arr = [] as number[];

      arrayH.forEach((h) => {
        h.hours.reduce((acc, obj) => {
          acc.push(+obj.open.split(':')[0]);
          arr.push(+obj.open.split(':')[0]);
          return acc;
        }, [] as number[]);
      });

      setStartHour(
        arr
          .sort((a, b) => (a < b ? -1 : 1))[0]
          .toString()
          .padStart(2, '0')
      );
    }
  }

  function getEndHour() {
    if (store && store.operation.length > 0) {
      const arrayH = normalizeOperations.normalize(store.operation);

      const arr = [] as number[];

      arrayH.forEach((h) => {
        h.hours.reduce((acc, obj) => {
          acc.push(+obj.close.split(':')[0]);
          arr.push(+obj.close.split(':')[0]);
          return acc;
        }, [] as number[]);
      });

      setEndHour(
        arr
          .sort((a, b) => (a < b ? 1 : -1))[0]
          .toString()
          .padStart(2, '0')
      );
    }
  }

  async function fetchStore() {
    try {
      const response = await storeServices.getStoreByEmail(user!.email);

      setStore(response!);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchItems() {
    try {
      const res = await itemServices.getItems();

      setItems(res!.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast({
        status: 'error',
        title: 'Atenção',
        description: "Algo deu errado: '" + JSON.stringify(error) + "'",
      });
    }
  }

  useEffect(() => {
    if (user) {
      fetchStore();
      fetchItems();
    }
  }, [user]);

  useEffect(() => {
    if (store) {
      getStartHour();
      getEndHour();
    }
  }, [store]);

  useEffect(() => {
    console.log(startHour, endHour);
  }, [startHour, endHour]);

  return (
    <StoreContext.Provider
      value={{
        items,
        store,
        startHour,
        endHour,
        fetchStore,
        fetchItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
