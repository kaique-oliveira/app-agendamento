import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

const fusoBrasilia = 'America/Sao_Paulo';

class FormatHelper {
  formatDate(dateString: string) {
    const date = new Date(dateString);

    date.setHours(0, 0, 0, 0);

    const dataBrasilia = toZonedTime(date, fusoBrasilia);
    const dataFormatada = format(dataBrasilia, "yyyy-MM-dd'T'HH:mm:ssxxx");

    return dataFormatada;
  }
  formatHour(hourString: string) {
    const date = new Date(2000, 1, 1);

    date.setHours(
      Number(hourString.substring(0, 2)),
      Number(hourString.substring(3, 5)),
      0,
      0,
    );

    const dataBrasilia = toZonedTime(date, fusoBrasilia);
    const dataFormatada = format(dataBrasilia, "yyyy-MM-dd'T'HH:mm:ssxxx");

    return dataFormatada;
  }
}

export const formatHelper = new FormatHelper();
