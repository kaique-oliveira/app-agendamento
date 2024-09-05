import { Calendar } from 'iconsax-react';
import { WrapperCalendar, WrapperDatePicker } from './styles';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ButtonIconComponent } from '../ButtonIconComponent';
import { CalendarComponent } from '../CalendarComponent';

type DatePickerProps = {
  onChangeDate(value: Date): void;
  currentDate: Date;
};

export function DatePicker({ onChangeDate, currentDate }: DatePickerProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    setOpenCalendar(false);
  }, [currentDate]);

  return (
    <WrapperDatePicker onMouseLeave={() => setOpenCalendar(false)}>
      <ButtonIconComponent
        variant="OUTLINE"
        icon={<Calendar style={{ transition: 'all .2s' }} size="20" />}
        onClick={() => setOpenCalendar(!openCalendar)}
      />

      <AnimatePresence mode="wait">
        {openCalendar && (
          <WrapperCalendar
            initial={{ scale: 0, opacity: 0, height: 30, width: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0, height: 30, width: 0 }}
            transition={{
              ease: 'easeOut',
              duration: 0.2,
            }}
          >
            <CalendarComponent onDateChange={onChangeDate} date={currentDate} />
          </WrapperCalendar>
        )}
      </AnimatePresence>
    </WrapperDatePicker>
  );
}
