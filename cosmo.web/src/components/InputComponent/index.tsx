import React from 'react';
import { Input, WrapperInput } from './styles';

type InputComponentProps = React.InputHTMLAttributes<HTMLInputElement>;

export function InputComponent({ ...rest }: InputComponentProps) {
  return (
    <WrapperInput>
      <Input {...rest} />
    </WrapperInput>
  );
}
