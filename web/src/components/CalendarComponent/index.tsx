import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { ButtonIconComponent } from '../ButtonIconComponent';
import {
  DayMonth,
  DaysWeekText,
  MonthHeader,
  WrapperCalendar,
  WrapperDaysMonth,
  WrapperDaysWeek,
  WrapperHeaderCalendar,
} from './styles';
import { useState } from 'react';

export const WeekDays = {
  domingo: 'Domingo',
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
} as const;

type CalendarComponentProps = {
  onDateChange(date: Date): void;
  date: Date;
};

export function CalendarComponent({
  onDateChange,
  date,
}: CalendarComponentProps) {
  const [dateNavigate, setDateNavigate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(date);

  function daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function navigateCalendar(date: Date) {
    setDateNavigate(date);
  }

  function handleDateClick(date: Date) {
    setSelectedDate(date);
    onDateChange(date);
  }

  function generateCalendar(month: number, year: number) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = daysInMonth(month, year);
    const calendar = [];

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<DayMonth key={j + 'column'}></DayMonth>);
        } else if (dayCounter <= daysInCurrentMonth) {
          const currentDate = new Date(year, month, dayCounter);
          const now = new Date();

          week.push(
            <DayMonth
              $states={
                currentDate.toDateString() === selectedDate.toDateString()
                  ? 'SELECTED'
                  : currentDate.toDateString() === now.toDateString()
                  ? 'CURRENT'
                  : 'NORMAL'
              }
              key={dayCounter}
              onClick={() => handleDateClick(currentDate)}
            >
              {dayCounter}
            </DayMonth>
          );
          dayCounter++;
        } else {
          week.push(<DayMonth key={j + 'day'}></DayMonth>);
        }
      }

      calendar.push(<DayMonth key={i + 'week'}>{week}</DayMonth>);
    }

    return calendar;
  }

  return (
    <WrapperCalendar>
      <WrapperHeaderCalendar>
        <ButtonIconComponent
          variant="GHOST"
          icon={<ArrowLeft2 size="22" />}
          onClick={() =>
            navigateCalendar(
              new Date(
                dateNavigate.getFullYear(),
                dateNavigate.getMonth() - 1,
                1
              )
            )
          }
        />

        <MonthHeader>
          {dateNavigate.toLocaleDateString('pt-BR', { month: 'long' })}
        </MonthHeader>

        <ButtonIconComponent
          variant="GHOST"
          icon={<ArrowRight2 size="22" />}
          onClick={() =>
            navigateCalendar(
              new Date(
                dateNavigate.getFullYear(),
                dateNavigate.getMonth() + 1,
                1
              )
            )
          }
        />
      </WrapperHeaderCalendar>

      <WrapperDaysWeek>
        {Object.entries(WeekDays).map((day) => (
          <DaysWeekText key={day[1]}>{day[1].substring(0, 3)}</DaysWeekText>
        ))}
      </WrapperDaysWeek>

      <WrapperDaysMonth
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {generateCalendar(dateNavigate.getMonth(), dateNavigate.getFullYear())}
      </WrapperDaysMonth>
    </WrapperCalendar>
  );
}
