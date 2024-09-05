import { useTheme } from 'styled-components';
import {
  Icon,
  TextPlaceholder,
  WrapperDropDown,
  WrapperOptions,
} from './styles';
import { Calendar } from 'iconsax-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CalendarComponent } from '../CalendarComponent';

type DropDownDateComponentProps = {
  placeholder: string;
  value: Date;
  onChangeDate(value: Date): void;
};

export function DropDownDateComponent({
  placeholder,
  value,
  onChangeDate,
}: DropDownDateComponentProps) {
  const { COLORS } = useTheme();

  const [toggleOpenOptions, setToggleOpenOptions] = useState(false);

  function handleSelectOption(date: Date) {
    onChangeDate(date);
    setToggleOpenOptions(false);
  }

  return (
    <WrapperDropDown
      $isOpenOptions={toggleOpenOptions}
      onMouseLeave={() => setToggleOpenOptions(false)}
    >
      <TextPlaceholder
        style={{ color: value ? COLORS.GRAY_300 : COLORS.GRAY_200 }}
        onClick={() => setToggleOpenOptions(!toggleOpenOptions)}
      >
        {value ? value.toLocaleDateString() : placeholder}
      </TextPlaceholder>
      <Icon>
        <Calendar size="32" />
      </Icon>

      <AnimatePresence mode="wait">
        {toggleOpenOptions && (
          <WrapperOptions
            initial={{ top: 10, opacity: 0 }}
            animate={{ top: 36, opacity: 1 }}
            exit={{ top: 10, opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
          >
            <CalendarComponent date={value} onDateChange={handleSelectOption} />
          </WrapperOptions>
        )}
      </AnimatePresence>
    </WrapperDropDown>
  );
}
