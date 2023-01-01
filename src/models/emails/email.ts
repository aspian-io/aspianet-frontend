import { Expose, plainToClassFromExist } from "class-transformer";
import { IBaseMinimalEntity } from "../common/base-entities";

export enum EmailPriorityEnum {
  HIGH = "high",
  LOW = "low",
  NORMAL = "normal"
}

export interface IEmailEntity extends IBaseMinimalEntity {
  from: string;
  to: string;
  subject: string;
  cc?: string;
  bcc?: string;
  replyTo?: string;
  priority: EmailPriorityEnum;
  html: string;
  templateDesign: string;
}

export interface ISendEmail {
  from: string;
  to: string;
  subject: string;
  cc?: string;
  bcc?: string;
  replyTo?: string;
  priority?: EmailPriorityEnum;
  html: string;
  templateDesign: string;
}

export class EmailSendFormValues implements ISendEmail {
  @Expose() from: string = '';
  @Expose() to: string = '';
  @Expose() subject: string = '';
  @Expose() cc?: string = '';
  @Expose() bcc?: string = '';
  @Expose() replyTo?: string = '';
  @Expose() priority?: EmailPriorityEnum = EmailPriorityEnum.NORMAL;
  @Expose() html: string = '';
  @Expose() templateDesign: string = '';

  constructor ( init?: EmailSendFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}