import { useContext } from 'react';
import { StoreContext } from '../context/store.context';

export const useStore = () => {
  const context = useContext(StoreContext);

  return context;
};
