import { createContext, ReactElement, useState } from 'react';
import {
  DialogComponent,
  DialogComponentProps,
} from '../components/DialogComponent';

type NewDialogComponentProps = Omit<DialogComponentProps, 'open'>;

type DialogType = {
  onOpenDialog(dialog: NewDialogComponentProps): void;
  onCloseDialog(): void;
};

export const DialogContext = createContext<DialogType>(null!);

export function DialogProvider({ children }: { children: ReactElement }) {
  const [dialog, setDialog] = useState<NewDialogComponentProps | null>(null);
  const [show, setShow] = useState(false);

  function onOpenDialog(dialog: NewDialogComponentProps) {
    setDialog(dialog);
    setShow(true);
  }

  function onCloseDialog() {
    setShow(false);

    setTimeout(() => {
      setDialog(null);
    }, 400);
  }

  return (
    <DialogContext.Provider value={{ onOpenDialog, onCloseDialog }}>
      {children}
      {dialog && (
        <DialogComponent
          open={show}
          text={dialog.text}
          labelCancel={dialog.labelCancel}
          labelConfirm={dialog.labelConfirm}
          onActionCancel={dialog.onActionCancel}
          onActionConfirm={dialog.onActionConfirm}
        />
      )}
    </DialogContext.Provider>
  );
}
