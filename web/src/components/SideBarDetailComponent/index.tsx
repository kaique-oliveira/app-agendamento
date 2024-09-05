import { AnimatePresence } from 'framer-motion';
import { WrapperContentDetail, WrapperHeader, WrapperSideBar } from './styles';
import { ButtonIconComponent } from '../ButtonIconComponent';
import { X } from '@phosphor-icons/react';
import React from 'react';

type SideBarDetailComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  title: string;
  onClose(value: boolean): void;
};

export function SideBarDetailComponent({
  open,
  title,
  onClose,
  ...rest
}: SideBarDetailComponentProps) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <WrapperSideBar
          initial={{ x: 410 }}
          animate={{ x: 0 }}
          exit={{ x: 410 }}
          transition={{ ease: 'linear', duration: 0.2 }}
        >
          <WrapperHeader>
            {title}
            <ButtonIconComponent
              onClick={() => onClose(false)}
              variant="GHOST"
              icon={<X size={18} color="red" />}
            />
          </WrapperHeader>

          <WrapperContentDetail {...rest} />
        </WrapperSideBar>
      )}
    </AnimatePresence>
  );
}
