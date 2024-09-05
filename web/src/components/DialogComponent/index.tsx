import { AnimatePresence } from 'framer-motion';
import { LabelDialog, WrapperButtons, WrapperDialog } from './styles';
import WrapperGlass from '../WrapperGlass';
import { ButtonComponent } from '../ButtonComponent';

export type DialogComponentProps = {
  open: boolean;
  labelCancel?: string;
  labelConfirm?: string;
  onActionCancel(): void;
  onActionConfirm(): void;
  text: string;
};

export function DialogComponent({
  open,
  text,
  labelCancel = 'Não',
  labelConfirm = 'Sim',
  onActionConfirm,
  onActionCancel,
}: DialogComponentProps) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <WrapperGlass>
          <WrapperDialog
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.1, opacity: 0 }}
          >
            <LabelDialog>{text}</LabelDialog>

            <WrapperButtons>
              <ButtonComponent
                variant="GHOST"
                text={labelCancel}
                onClick={onActionCancel}
              />

              <ButtonComponent
                variant="GHOST"
                text={labelConfirm}
                onClick={onActionConfirm}
              />
            </WrapperButtons>
          </WrapperDialog>
        </WrapperGlass>
      )}
    </AnimatePresence>
  );
}
