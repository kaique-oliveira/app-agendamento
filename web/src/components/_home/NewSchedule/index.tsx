import { useEffect, useState } from 'react';
import { DropDownComponent, Option } from '../../DropDownComponent';
import { DropDownDateComponent } from '../../DropDownDateComponent';
import { IItem } from '../../../Interfaces';
import { storeServices } from '../../../services/storeServices';
import { WrapperGroup } from './styles';
import { InputComponent } from '../../InputComponent';
import { useToast } from '../../../hooks/useToast';

type NewScheduleProps = {
  items: IItem[];
  schedulingDate: Date;
  onChangeSchedulingDate(value: Date): void;
  currentItem: Option | null;
  onChangeCurrentItem(option: Option | null): void;
  hourStart: Option | null;
  onChangeHourStart(option: Option | null): void;
  hourEnd: Option | null;
  onChangeHourEnd(option: Option | null): void;
  nameOwner: string;
  onChangeNameOwner(value: string): void;
};

export function NewSchedule({
  items,
  schedulingDate,
  onChangeSchedulingDate,
  currentItem,
  onChangeCurrentItem,
  hourStart,
  hourEnd,
  onChangeHourStart,
  onChangeHourEnd,
  nameOwner,
  onChangeNameOwner,
}: NewScheduleProps) {
  const [availableHours, setAvailableHours] = useState<string[]>([]);

  const { onShowToast } = useToast();

  async function availableTimes() {
    try {
      const res = await storeServices.availableTimes(
        schedulingDate.toJSON(),
        Number(currentItem!.id!)
      );

      setAvailableHours(res);
    } catch (error) {
      onShowToast({
        status: 'ERROR',
        text: 'Algo deu errado ao buscar os horários disponiveis.',
      });
    }
  }

  useEffect(() => {
    if (currentItem && schedulingDate) {
      availableTimes();
    }
  }, [currentItem, schedulingDate]);

  return (
    <>
      <DropDownDateComponent
        placeholder="Selecione o dia"
        onChangeDate={onChangeSchedulingDate}
        value={schedulingDate}
      />

      <DropDownComponent
        placeholder="Selecione um item"
        value={currentItem}
        onChangeOption={onChangeCurrentItem}
        options={items.reduce((acc, obj) => {
          acc.push({
            id: String(obj.id),
            label: obj.name,
          });
          return acc;
        }, [] as Option[])}
      />

      <InputComponent
        style={{ textTransform: 'capitalize' }}
        placeholder="Quem está agendando?"
        value={nameOwner}
        onChange={(e) => onChangeNameOwner(e.target.value)}
      />

      <WrapperGroup>
        <DropDownComponent
          isDisable={currentItem ? false : true}
          placeholder="Hora inicial"
          value={hourStart}
          onChangeOption={onChangeHourStart}
          options={availableHours
            .filter((_, i) => i !== availableHours.length - 1)
            .filter((a) => {
              if (
                schedulingDate.toLocaleDateString() ===
                new Date().toLocaleDateString()
              ) {
                return (
                  +new Date().toLocaleTimeString().split(':')[0] <
                    +a.split(':')[0] &&
                  +a.split(':')[1] <
                    +new Date().toLocaleTimeString().split(':')[1]
                );
              } else {
                return a;
              }
            })
            .reduce((acc, obj, indice) => {
              acc.push({
                id: String(indice),
                label: obj,
              });
              return acc;
            }, [] as Option[])}
        />

        <DropDownComponent
          isDisable={currentItem && hourStart ? false : true}
          placeholder="Hora final"
          value={hourEnd}
          onChangeOption={onChangeHourEnd}
          options={availableHours
            .filter(
              (_, i) => hourStart && i > availableHours.indexOf(hourStart.label)
            )
            .reduce((acc, obj, indice) => {
              acc.push({
                id: String(indice),
                label: obj,
              });
              return acc;
            }, [] as Option[])}
        />
      </WrapperGroup>
    </>
  );
}
