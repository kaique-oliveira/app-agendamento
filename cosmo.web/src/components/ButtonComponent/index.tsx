import { MotionProps } from 'framer-motion';
import { VariantStyleProps, WrapperButton } from './styles';
import { ReactElement } from 'react';

type ButtonComponentProps = React.HTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    variant?: VariantStyleProps;
    text: string;
    icon?: ReactElement;
    positionIcon?: 'RIGHT' | 'LEFT';
    isDisable?: boolean;
  };

export function ButtonComponent({
  text,
  variant = 'SOLID',
  icon,
  positionIcon = 'RIGHT',
  isDisable = false,
  ...rest
}: ButtonComponentProps) {
  return (
    <WrapperButton
      $isDisable={isDisable}
      disabled={isDisable}
      $positionIcon={positionIcon}
      {...rest}
      $variant={variant}
    >
      {icon}
      {text}
    </WrapperButton>
  );
}
