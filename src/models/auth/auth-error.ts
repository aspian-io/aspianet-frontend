export interface IUserError {
  statusCode?: number;
  internalCode: number;
  message: string;
}

export enum UserErrorsEnum {
  INACTIVE_ACCOUNT = 'Inactive Account',
  SUSPENDED_ACCOUNT = 'Suspended Account',
  ALREADY_VERIFIED = 'Already Verified',
  BAD_REQUEST = 'Something went wrong'
}

export enum UserErrorsInternalCodeEnum {
  INACTIVE_ACCOUNT = 4031,
  SUSPENDED_ACCOUNT = 4032,
  ALREADY_VERIFIED = 4033,
  BAD_REQUEST = 4000
}