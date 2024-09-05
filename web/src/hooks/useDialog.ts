import { useContext } from 'react';
import { DialogContext } from '../context/dialog.context';

export const useDialog = () => {
  const context = useContext(DialogContext);

  return context;
};
