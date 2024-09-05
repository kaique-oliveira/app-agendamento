import { DayWeek, IOperation } from '../Interfaces';

export type OperationsFormat = {
  dayWeek: DayWeek;
  hours: HoursOperation[];
};

export type HoursOperation = {
  open: string;
  close: string;
};

const orderWeekDay = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sábado',
  'Domingo',
];

class NormalizeOperations {
  normalize(operations: IOperation[]) {
    const newOperations = operations.reduce((acc, operation) => {
      operation.daysWeek.forEach((d) => {
        const isExists = acc.find((f) => f.dayWeek.day === d.day);

        if (isExists) {
          acc
            .find((o) => o.dayWeek.day === d.day)
            ?.hours.push({ open: operation.open, close: operation.close });

          acc
            .find((o) => o.dayWeek.day === d.day)
            ?.hours.sort((a, b) => (a.open > b.open ? 1 : -1));
        } else {
          const newOp = {
            dayWeek: d,
            hours: [{ open: operation.open, close: operation.close }],
          } as OperationsFormat;

          acc.push(newOp);
        }
      });

      return acc;
    }, [] as OperationsFormat[]);

    const newFormat = [] as OperationsFormat[];

    orderWeekDay.forEach((day) => {
      const n = newOperations.find((f) => f.dayWeek.day === day);

      if (n) {
        newFormat.push(n);
      }
    });

    return newFormat;
  }
}

export const normalizeOperations = new NormalizeOperations();
