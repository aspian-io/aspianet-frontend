import { Expose, plainToClassFromExist } from "class-transformer";
import { IBaseMinimalEntity } from "../../../common/base-entities";

export interface ISubscriberEntity extends IBaseMinimalEntity {
  name: string;
  email: string;
  approved: boolean;
  token: number;
  tokenExpiresAt: Date;
  isTokenExpired: boolean;
}

interface IAdminSubscriberCreateFormValues {
  name: string;
  email: string;
  approved?: boolean;
}

export class AdminSubscriberCreateFormValues implements IAdminSubscriberCreateFormValues {
  @Expose() name: string = '';
  @Expose() email: string = '';
  @Expose() approved?: boolean = false;

  constructor ( init?: AdminSubscriberCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class AdminSubscriberUpdateFormValues implements Partial<IAdminSubscriberCreateFormValues> {
  @Expose() name?: string = '';
  @Expose() email?: string = '';
  @Expose() approved?: boolean = false;

  constructor ( init?: AdminSubscriberUpdateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}