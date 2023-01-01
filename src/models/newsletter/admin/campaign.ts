import { Expose, plainToClassFromExist } from "class-transformer";
import { IBaseMinimalEntity } from "../../common/base-entities";

export interface ICampaignEntity extends IBaseMinimalEntity {
  name: string;
  description?: string;
  sendingTime: Date;
  emailSubject: string;
  content: string;
  templateDesign: string;
  sendingFailedTrackingNum: number;
  sendToSubscribers: boolean;
  sendToUsers: boolean;
  beenSent: boolean;
}

interface INewsletterCampaignCreateFormValues {
  name: string;
  description?: string;
  sendingTime?: Date;
  emailSubject: string;
  content: string;
  templateDesign: string;
  sendToSubscribers?: boolean;
  sendToUsers?: boolean;
}

export class NewsletterCampaignCreateFormValues implements INewsletterCampaignCreateFormValues {
  @Expose() name: string = '';
  @Expose() description?: string = '';
  @Expose() sendingTime?: Date = undefined;
  @Expose() emailSubject: string = '';
  @Expose() content: string = '';
  @Expose() templateDesign: string = '';
  @Expose() sendToSubscribers?: boolean = true;
  @Expose() sendToUsers?: boolean = false;

  constructor ( init?: NewsletterCampaignCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}

export class NewsletterCampaignUpdateFormValues implements Partial<INewsletterCampaignCreateFormValues> {
  @Expose() name?: string = '';
  @Expose() description?: string = '';
  @Expose() sendingTime?: Date = undefined;
  @Expose() emailSubject?: string = '';
  @Expose() content?: string = '';
  @Expose() templateDesign: string = '';
  @Expose() sendToSubscribers?: boolean = true;
  @Expose() sendToUsers?: boolean = false;

  constructor ( init?: NewsletterCampaignCreateFormValues ) {
    plainToClassFromExist(
      this,
      init,
      { excludeExtraneousValues: true }
    );
  }
}