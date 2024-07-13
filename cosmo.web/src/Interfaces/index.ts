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
  createdAt: Date;
  updatedAt: Date;
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
  operation: [];
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  type: ItemType;
  specificAttributes: JSON;
  createdAt: Date;
  updatedAt: Date;
}

enum ItemType {
  CAR,
  HOUSE,
  COURT,
}
