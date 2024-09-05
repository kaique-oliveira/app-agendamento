import { useEffect, useState } from 'react';
import {
  ContentPanel,
  HeaderPanel,
  Line,
  WrapperContent,
  WrapperPanel,
  WrapperSidebar,
  WrapperTextContent,
  WrapperTextHeader,
  WrapperTextSidebar,
} from './styles';
import { useStore } from '../../hooks/useStore';
import { format } from '../../helpers/format';
import { CardScheduling } from '../CardScheduling';
import { IItem, IScheduling } from '../../Interfaces';

type PanelScheduledComponentProps = {
  currentDate: Date;
  search: string;
  items: IItem[];
  onOpenDetailsScheduled(value: false): void;
  onFocusScheduled(scheduled: IScheduling | null): void;
};

export function PanelScheduledComponent({
  currentDate,
  search,
  items,
  onOpenDetailsScheduled,
  onFocusScheduled,
}: PanelScheduledComponentProps) {
  const { startHour, endHour } = useStore();

  const [headerDates, setHeaderDates] = useState<Date[]>([]);
  const [sidebarHours, setSidebarHours] = useState<string[]>([]);
  const [scheduled, setScheduled] = useState<IScheduling[]>([]);
  const indiceRows = [] as string[];

  function generateHeaderDates() {
    setHeaderDates(
      Array.from(
        { length: 7 },
        (_, i) => new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000)
      )
    );
  }

  function generateSidebarHours() {
    const hours = [] as string[];

    for (let i = +startHour; i <= +endHour; i++) {
      const hora = i.toString().padStart(2, '0');

      const horario = `${hora}:00`;
      hours.push(horario);
    }

    hours.forEach((_, i) => {
      indiceRows.push(`${i}0`);
    });

    setSidebarHours(hours);
  }

  function defineCardStatus(dateCard: Date) {
    const currentDate = new Date();

    if (
      dateCard.getDate() === currentDate.getDate() &&
      dateCard.getMonth() === currentDate.getMonth()
    ) {
      return 'CURRENT';
    }

    if (
      (dateCard.getDate() < currentDate.getDate() &&
        dateCard.getMonth() == currentDate.getMonth()) ||
      dateCard.getMonth() < currentDate.getMonth()
    ) {
      return 'PREVIOUS';
    }

    if (
      dateCard.getDate() > currentDate.getDate() &&
      dateCard.getMonth() >= currentDate.getMonth()
    ) {
      return 'NEXT';
    }
  }

  useEffect(() => {
    generateHeaderDates();
    generateSidebarHours();
  }, [startHour, endHour, currentDate]);

  useEffect(() => {
    if (items.length > 0) {
      const sched = items.reduce((acc, obj) => {
        acc.push(...obj.scheduling);
        return acc;
      }, [] as IScheduling[]);

      console.log('schedule', sched);
      setScheduled(sched);
    }
  }, [items]);

  return (
    <WrapperPanel>
      <HeaderPanel>
        <WrapperTextHeader />
        {headerDates.map((date, i) => (
          <WrapperTextHeader key={i}>
            {format.dataScheduled(date)}
          </WrapperTextHeader>
        ))}
      </HeaderPanel>

      <WrapperContent>
        <WrapperSidebar $numberRows={sidebarHours.length}>
          {sidebarHours.map((hour, i) => (
            <WrapperTextSidebar key={i}>{hour}</WrapperTextSidebar>
          ))}
        </WrapperSidebar>

        <ContentPanel $numberRows={sidebarHours.length}>
          {sidebarHours.map((hour, o) => {
            return headerDates.map((date, i) => (
              <WrapperTextContent id={`${o}${i}`} key={`${o}${i}`}>
                <Line />

                {scheduled
                  .filter((s) =>
                    search
                      ? s.ownerScheduled
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      : s
                  )
                  .filter(
                    (f) =>
                      new Date(f.date).toLocaleDateString() ===
                        new Date(date).toLocaleDateString() &&
                      f.startTime.split('T')[1].substring(0, 2) ===
                        hour.substring(0, 2)
                  )
                  .map((m) => (
                    <CardScheduling
                      onFocusScheduled={onFocusScheduled}
                      onOpenDetails={onOpenDetailsScheduled}
                      key={m.id}
                      scheduling={m}
                      state={
                        defineCardStatus(
                          new Date(
                            Number(m.date.substring(0, 4)),
                            Number(m.date.substring(5, 7)) - 1,
                            Number(m.date.substring(8, 10))
                          )
                        )!
                      }
                    />
                  ))}
              </WrapperTextContent>
            ));
          })}
        </ContentPanel>
      </WrapperContent>
    </WrapperPanel>
  );
}
