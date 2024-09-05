import { createContext, ReactElement, useEffect, useState } from 'react';
import { ToastComponent } from '../components/ToastComponent';

type Toast = {
  text: string;
  status: 'ERROR' | 'WARNING' | 'SUCCESS';
};

type ToastType = {
  toast: Toast | null;
  onShowToast(toast: Toast): void;
};

export const ToastContext = createContext<ToastType>(null!);

export function ToastProvider({ children }: { children: ReactElement }) {
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  function onShowToast(toast: Toast) {
    setToast(toast);
    setShow(true);
  }

  function onHiddenToast() {
    setToast(null);
    setShow(false);
  }

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        onHiddenToast();
      }, 4000);
    }
  }, [show]);

  return (
    <ToastContext.Provider
      value={{
        toast,
        onShowToast,
      }}
    >
      {children}
      <ToastComponent
        status={toast ? toast.status : 'SUCCESS'}
        text={toast ? toast.text : ''}
        open={show && toast ? true : false}
      />
    </ToastContext.Provider>
  );
}
