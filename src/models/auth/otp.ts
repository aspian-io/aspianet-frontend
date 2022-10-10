export interface IUserOtp {
  email: string;
  token: string;
}

export class UserOtp implements IUserOtp {
  email: string = '';
  token: string = '';

  constructor ( init?: IUserOtp ) {
    Object.assign( this, init );
  }
}

export interface IUserResetPasswordOtp extends IUserOtp {
  password: string;
}

export class UserResetPasswordOtp implements IUserResetPasswordOtp {
  email: string = '';
  password: string = '';
  token: string = '';

  constructor ( init?: IUserResetPasswordOtp ) {
    Object.assign( this, init );
  }
}