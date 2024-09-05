import { MotionProps } from 'framer-motion';
import { VariantStyleProps, WrapperButton } from './styles';
import { ReactElement } from 'react';

type ButtonIconComponentProps = React.HTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    variant?: VariantStyleProps;
    icon: ReactElement;
  };

export function ButtonIconComponent({
  icon,
  variant = 'SOLID',
  ...rest
}: ButtonIconComponentProps) {
  return (
    <WrapperButton {...rest} $variant={variant}>
      {icon}
    </WrapperButton>
  );
}
