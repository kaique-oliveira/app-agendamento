export interface IStore {
  id?: number;
  name: string;
  cnpj: string;
  img?: File;
  email: string;
  password: string;
}

export interface IUser {
  token: string;
  name: string;
  email: string;
  cnpj: string;
  img: IImg[];
}

interface IImg {
  type: string;
  data: ArrayBuffer;
}

export interface IStoreFull {
  id: number;
  name: string;
  cnpj: string;
  img: IImg[];
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  address: {
    id: number;
    street: string;
    neighborhood: string;
    zipCode: number;
    city: string;
    uf: string;
    number: number;
    storeId: number;
  };
  operation: IOperation[];
}

export interface DayWeek {
  id: string;
  day: string;
}

export interface IOperation {
  daysWeek: DayWeek[];
  open: string;
  close: string;
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  type: ItemType;
  specificAttributes: string;
  createdAt: Date;
  updatedAt: Date;
  scheduling: IScheduling[];
}

export interface IScheduling {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
  ownerScheduled: string;
  itemSchedulableId?: number;
  clientId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IWeekDays {
  id: number;
  day: string;
  index: number;
}

enum ItemType {
  CAR,
  HOUSE,
  COURT,
}
