import { useTheme } from 'styled-components';
import {
  Icon,
  ListOptions,
  TagSelected,
  TextOptions,
  TextPlaceholder,
  WrapperDropDown,
  WrapperOptions,
} from './styles';
import { ArrowDown2 } from 'iconsax-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ButtonIconComponent } from '../ButtonIconComponent';
import { X } from '@phosphor-icons/react';

export type Option = {
  id: string;
  label: string;
};

type MultDropDownComponentProps = {
  placeholder: string;
  options: Option[];
  values: Option[];
  onChangeOption(option: Option[]): void;
  isDisable?: boolean;
};

export function MultDropDownComponent({
  placeholder,
  options,
  values,
  onChangeOption,
  isDisable = false,
}: MultDropDownComponentProps) {
  const { COLORS } = useTheme();

  const [toggleOpenOptions, setToggleOpenOptions] = useState(false);

  function handleSelectOption(option: Option) {
    onChangeOption([...values, option]);
  }

  function handleRemoveOption(option: Option) {
    onChangeOption(values.filter((f) => f.id != option.id));
  }

  return (
    <WrapperDropDown
      onClick={() => !isDisable && setToggleOpenOptions(true)}
      $isDisable={isDisable}
      $isOpenOptions={toggleOpenOptions}
      onMouseLeave={() => setToggleOpenOptions(false)}
    >
      {values.length === 0 && (
        <TextPlaceholder
          style={{ color: COLORS.GRAY_200 }}
          onClick={() => !isDisable && setToggleOpenOptions(!toggleOpenOptions)}
        >
          {placeholder}
        </TextPlaceholder>
      )}

      <AnimatePresence mode="wait">
        {values.map((v) => (
          <TagSelected
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.1 }}
          >
            {v.label}{' '}
            {
              <ButtonIconComponent
                onClick={() => !isDisable && handleRemoveOption(v)}
                variant="GHOST"
                icon={<X size={14} color={COLORS.GRAY_300} />}
              />
            }
          </TagSelected>
        ))}
      </AnimatePresence>

      <Icon
        onClick={() => !isDisable && setToggleOpenOptions(!toggleOpenOptions)}
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
            initial={{ top: 38, opacity: 0 }}
            animate={{ top: 76, opacity: 1 }}
            exit={{ top: 38, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
          >
            <ListOptions>
              {options
                .filter((f) => !values.find((v) => v.id === f.id))
                .map((o) => (
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
