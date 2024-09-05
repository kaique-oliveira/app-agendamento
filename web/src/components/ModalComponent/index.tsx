import { AnimatePresence } from 'framer-motion';
import { ButtonComponent } from '../ButtonComponent';
import WrapperGlass from '../WrapperGlass';
import {
  TitleModal,
  WrapperContentModal,
  WrapperFooterModal,
  WrapperModal,
} from './styles';

const HEIGHT_SCREEN = window.innerHeight;

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  toggleOpen: boolean;
  onActionCancel(value: boolean): void;
  onActionConfirm(): void;
  isDisableConfirm?: boolean;
};

export function ModalComponent({
  title,
  toggleOpen,
  onActionCancel,
  onActionConfirm,
  isDisableConfirm = false,
  ...rest
}: ModalProps) {
  return (
    <AnimatePresence mode="wait">
      {toggleOpen && (
        <WrapperGlass>
          <WrapperModal
            initial={{ y: HEIGHT_SCREEN }}
            animate={{ y: 0 }}
            exit={{ y: HEIGHT_SCREEN }}
          >
            <TitleModal>{title}</TitleModal>

            <WrapperContentModal {...rest} />

            <WrapperFooterModal>
              <ButtonComponent
                text="Cancelar"
                variant="CANCEL"
                onClick={() => onActionCancel(false)}
              />
              <ButtonComponent
                isDisable={isDisableConfirm}
                text="Salvar"
                variant="SOLID"
                onClick={onActionConfirm}
              />
            </WrapperFooterModal>
          </WrapperModal>
        </WrapperGlass>
      )}
    </AnimatePresence>
  );
}
