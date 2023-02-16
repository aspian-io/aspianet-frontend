import { Expose, plainToClassFromExist } from "class-transformer";

export interface ISubscriberDto {
  name: string;
  email: string;
}

export class SubscriberCreateFormValues {
  @Expose() name?: string = '';
  @Expose() email?: string = '';

  constructor ( init?: SubscriberCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class SubscriptionTokenDto {
  @Expose() email?: string = '';
  @Expose() token?: number = undefined;

  constructor ( init?: SubscriptionTokenDto ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class UnsubscribeDto extends SubscriptionTokenDto { }

export class UnsubscribeReqDto {
  @Expose() email?: string = '';

  constructor ( init?: UnsubscribeReqDto ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export interface ISubscriberOtp {
  email: string;
  token: string;
}

export class SubscriberOtp implements ISubscriberOtp {
  email: string = '';
  token: string = '';

  constructor ( init?: ISubscriberOtp ) {
    Object.assign( this, init );
  }
}