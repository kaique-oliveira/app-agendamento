import {
  Prisma,
  Store,
  Address,
  DayWeek,
  OperationHour,
  SchedulableItem,
  Client,
  Scheduling,
} from '@prisma/client';

export interface ICreateStore extends Prisma.StoreCreateInput {}
export interface IUpdateStore extends Prisma.StoreUpdateInput {}
export interface ISelectStore extends Store {}

export interface ICreateAddress extends Prisma.AddressCreateInput {}
export interface IUpdateAddress extends Prisma.AddressUpdateInput {}
export interface ISelectAddress extends Address {}

export interface ICreateDayWeek extends Prisma.DayWeekCreateInput {}
export interface IUpdateDayWeek extends Prisma.DayWeekUpdateInput {}
export interface ISelectDayWeek extends DayWeek {}

export interface ICreateOperationHour extends Prisma.OperationHourCreateInput {}
export interface IUpdateOperationHour extends Prisma.OperationHourUpdateInput {}
export interface ISelectOperationHour extends OperationHour {}

export interface ICreateSchedulableItem
  extends Prisma.SchedulableItemCreateInput {}
export interface IUpdateSchedulableItem
  extends Prisma.SchedulableItemUpdateInput {}
export interface ISelectSchedulableItem extends SchedulableItem {}

export interface ICreateScheduling extends Prisma.SchedulingCreateInput {}
export interface IUpdateScheduling extends Prisma.SchedulingUpdateInput {}
export interface ISelectScheduling extends Scheduling {}

export interface ICreateClient extends Prisma.ClientCreateInput {}
export interface IUpdateClient extends Prisma.ClientUpdateInput {}
export interface ISelectClient extends Client {}
