import { useTheme } from 'styled-components';
import {
  Icon,
  ListOptions,
  TextOptions,
  TextPlaceholder,
  WrapperDropDown,
  WrapperOptions,
} from './styles';
import { ArrowDown2 } from 'iconsax-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export type Option = {
  id: string;
  label: string;
};

type DropDownComponentProps = {
  placeholder: string;
  options: Option[];
  value: Option | null;
  onChangeOption(option: Option | null): void;
  isDisable?: boolean;
};

export function DropDownComponent({
  placeholder,
  options,
  value,
  onChangeOption,
  isDisable = false,
}: DropDownComponentProps) {
  const { COLORS } = useTheme();

  const [toggleOpenOptions, setToggleOpenOptions] = useState(false);

  function handleSelectOption(option: Option) {
    onChangeOption(option);
    setToggleOpenOptions(false);
  }

  return (
    <WrapperDropDown
      $isDisable={isDisable}
      $isOpenOptions={toggleOpenOptions}
      onMouseLeave={() => setToggleOpenOptions(false)}
    >
      <TextPlaceholder
        style={{ color: value ? COLORS.GRAY_300 : COLORS.GRAY_200 }}
        onClick={() => !isDisable && setToggleOpenOptions(!toggleOpenOptions)}
      >
        {value ? value.label : placeholder}
      </TextPlaceholder>
      <Icon
        initial={{ rotate: 0 }}
        animate={{ rotate: toggleOpenOptions ? 180 : 0 }}
        transition={{
          duration: 0.2,
        }}
      >
        <ArrowDown2 size="32" color={COLORS.GRAY_200} />
      </Icon>

      <AnimatePresence mode="wait">
        {toggleOpenOptions && (
          <WrapperOptions
            initial={{ top: 10, opacity: 0 }}
            animate={{ top: 34, opacity: 1 }}
            exit={{ top: 10, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
          >
            <ListOptions>
              {options.map((o) => (
                <TextOptions key={o.id} onClick={() => handleSelectOption(o)}>
                  {o.label}
                </TextOptions>
              ))}
            </ListOptions>
          </WrapperOptions>
        )}
      </AnimatePresence>
    </WrapperDropDown>
  );
}
