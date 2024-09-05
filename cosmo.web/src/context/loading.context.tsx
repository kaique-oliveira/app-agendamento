import { createContext, ReactElement, useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent';

type LoadingType = {
  onShowLoading(): void;
  onHiddeLoading(): void;
};

export const LoadingContext = createContext<LoadingType>(null!);

export function LoadingProvider({ children }: { children: ReactElement }) {
  const [show, setShow] = useState(false);

  function onShowLoading() {
    setShow(true);
  }

  function onHiddeLoading() {
    setShow(false);
  }

  return (
    <LoadingContext.Provider
      value={{
        onShowLoading,
        onHiddeLoading,
      }}
    >
      {children}
      {show && <LoadingComponent />}
    </LoadingContext.Provider>
  );
}
