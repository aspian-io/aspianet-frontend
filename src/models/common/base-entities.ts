import { IUserEntity } from "../users/admin/user";

export interface IBaseMinimalEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  deletedAt?: Date;
}

export interface IBaseEntity extends IBaseMinimalEntity {
  createdBy: IUserEntity;
  updatedBy?: IUserEntity;
}