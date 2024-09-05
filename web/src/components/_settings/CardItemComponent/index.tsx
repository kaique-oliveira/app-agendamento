import { ArrowLeft2 } from 'iconsax-react';
import { IItem } from '../../../Interfaces';
import { BtnArrow, LabelDescription, LabelTitle, WrapperCard } from './styles';
import { MotionProps } from 'framer-motion';
import React from 'react';

type CardItemComponentProps = MotionProps &
  React.HTMLAttributes<HTMLDivElement> & {
    item: IItem;
    isActive: boolean;
  };

export function CardItemComponent({
  item,
  isActive,
  ...rest
}: CardItemComponentProps) {
  return (
    <WrapperCard $isActive={isActive} {...rest}>
      <LabelTitle>{item.name}</LabelTitle>
      <LabelDescription>{item.description}</LabelDescription>

      <BtnArrow
        initial={{ rotate: 0 }}
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.1 }}
        $isActive={isActive}
        variant="GHOST"
        icon={<ArrowLeft2 size="18" />}
      />
    </WrapperCard>
  );
}
