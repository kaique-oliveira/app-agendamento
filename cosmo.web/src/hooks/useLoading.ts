import { useContext } from 'react';
import { LoadingContext } from '../context/loading.context';

export const useLoading = () => {
  const context = useContext(LoadingContext);

  return context;
};
