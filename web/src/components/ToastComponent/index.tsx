import { AnimatePresence } from 'framer-motion';
import { LabelToast, WrapperToast } from './styles';
import { InfoCircle } from 'iconsax-react';
import { useTheme } from 'styled-components';

type ToastComponentProps = {
  text: string;
  open: boolean;
  status: 'ERROR' | 'WARNING' | 'SUCCESS';
};

export function ToastComponent({ text, open, status }: ToastComponentProps) {
  const { COLORS } = useTheme();

  return (
    <AnimatePresence mode="wait">
      {open && (
        <WrapperToast
          initial={{ x: 310, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 310, opacity: 0 }}
        >
          <InfoCircle
            size="20"
            color={
              status === 'SUCCESS'
                ? COLORS.GREEN_100
                : status === 'WARNING'
                ? COLORS.YELLOW_100
                : COLORS.RED_100
            }
          />
          <LabelToast>{text}</LabelToast>
        </WrapperToast>
      )}
    </AnimatePresence>
  );
}
