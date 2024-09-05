import { MotionProps } from 'framer-motion';
import { BtnArrow, LabelTag, WrapperTag } from './styles';
import { ArrowLeft2 } from 'iconsax-react';

type TagComponentProps = MotionProps &
  React.HTMLAttributes<HTMLDivElement> & {
    isActive: boolean;
    text: string;
  };

export function TagComponent({ isActive, text, ...rest }: TagComponentProps) {
  return (
    <WrapperTag {...rest} $isActive={isActive}>
      <LabelTag>{text}</LabelTag>

      <BtnArrow
        initial={{ rotate: 0 }}
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.1 }}
        $isActive={isActive}
        variant="GHOST"
        icon={<ArrowLeft2 size="18" />}
      />
    </WrapperTag>
  );
}
